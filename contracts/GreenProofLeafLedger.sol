// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {FHE, euint32, externalEuint32} from "@fhevm/solidity/lib/FHE.sol";
import {LocalConfig} from "./LocalConfig.sol";

/// @title GreenProof Leaf Ledger - Privacy-Preserving Environmental Impact Tracker
/// @author GreenProof Team
/// @notice A privacy-preserving environmental impact tracking system using FHE technology
/// @dev Records and verifies environmental impact data while maintaining complete privacy
contract GreenProofLeafLedger is LocalConfig {
    /// @notice Environmental data categories
    enum DataCategory {
        CO2_REDUCTION,
        ENERGY_SAVINGS,
        WATER_CONSERVATION,
        WASTE_REDUCTION
    }

    /// @notice Structure to store encrypted environmental record
    struct EnvironmentalRecord {
        euint32 encryptedValue;
        DataCategory category;
        uint256 timestamp;
        address recorder;
    }

    /// @notice Mapping from record ID to environmental record
    mapping(uint256 => EnvironmentalRecord) private _records;

    /// @notice Total number of records
    uint256 private _recordCount;

    /// @notice Mapping from user to their record IDs
    mapping(address => uint256[]) private _userRecords;

    /// @notice Maximum allowed value to prevent overflow
    uint32 public constant MAX_VALUE = 1000000;

    /// @notice Event emitted when a new environmental record is created
    event RecordCreated(
        uint256 indexed recordId,
        address indexed recorder,
        DataCategory category,
        uint256 timestamp
    );

    /// @notice Event emitted when a record is updated
    event RecordUpdated(
        uint256 indexed recordId,
        address indexed updater,
        uint256 timestamp
    );

    /// @notice Error thrown when record does not exist
    error RecordNotFound(uint256 recordId);

    /// @notice Error thrown when caller is not the record owner
    error NotRecordOwner(uint256 recordId, address caller);

    /// @notice Creates a new encrypted environmental record
    /// @param inputValue The encrypted environmental impact value
    /// @param inputProof The proof for the encrypted input
    /// @param category The category of environmental data
    /// @return recordId The ID of the newly created record
    function createRecord(
        externalEuint32 inputValue,
        bytes calldata inputProof,
        DataCategory category
    ) external returns (uint256 recordId) {
        euint32 encryptedValue = FHE.fromExternal(inputValue, inputProof);

        recordId = _recordCount++;

        _records[recordId] = EnvironmentalRecord({
            encryptedValue: encryptedValue,
            category: category,
            timestamp: block.timestamp,
            recorder: msg.sender
        });

        _userRecords[msg.sender].push(recordId);

        FHE.allowThis(_records[recordId].encryptedValue);
        FHE.allow(_records[recordId].encryptedValue, msg.sender);

        emit RecordCreated(recordId, msg.sender, category, block.timestamp);
    }

    /// @notice Updates an existing environmental record
    /// @param recordId The ID of the record to update
    /// @param inputValue The new encrypted environmental impact value
    /// @param inputProof The proof for the encrypted input
    function updateRecord(
        uint256 recordId,
        externalEuint32 inputValue,
        bytes calldata inputProof
    ) external {
        if (recordId >= _recordCount) {
            revert RecordNotFound(recordId);
        }

        EnvironmentalRecord storage record = _records[recordId];

        if (record.recorder != msg.sender) {
            revert NotRecordOwner(recordId, msg.sender);
        }

        euint32 encryptedValue = FHE.fromExternal(inputValue, inputProof);
        record.encryptedValue = encryptedValue;
        record.timestamp = block.timestamp;

        FHE.allowThis(record.encryptedValue);
        FHE.allow(record.encryptedValue, msg.sender);

        emit RecordUpdated(recordId, msg.sender, block.timestamp);
    }

    /// @notice Gets the encrypted value of a record
    /// @param recordId The ID of the record
    /// @return The encrypted environmental impact value
    function getRecordValue(uint256 recordId) external view returns (euint32) {
        if (recordId >= _recordCount) {
            revert RecordNotFound(recordId);
        }
        return _records[recordId].encryptedValue;
    }

    /// @notice Gets the metadata of a record (non-encrypted fields)
    /// @param recordId The ID of the record
    /// @return category The category of the record
    /// @return timestamp The timestamp when the record was created/updated
    /// @return recorder The address that created the record
    function getRecordMetadata(uint256 recordId)
        external
        view
        returns (
            DataCategory category,
            uint256 timestamp,
            address recorder
        )
    {
        if (recordId >= _recordCount) {
            revert RecordNotFound(recordId);
        }

        EnvironmentalRecord storage record = _records[recordId];
        return (record.category, record.timestamp, record.recorder);
    }

    /// @notice Gets all record IDs for a user
    /// @param user The address of the user
    /// @return An array of record IDs belonging to the user
    function getUserRecords(address user) external view returns (uint256[] memory) {
        return _userRecords[user];
    }

    /// @notice Gets the total number of records
    /// @return The total record count
    function getRecordCount() external view returns (uint256) {
        return _recordCount;
    }
}
