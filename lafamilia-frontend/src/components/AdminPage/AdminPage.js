import React, {useEffect, useRef, useState} from 'react';
import './AdminPage.css';
import * as client from '../../client/client';
import LoginForm from "../LoginForm/LoginForm";

const AdminPage = () => {
    const [user, setUser] = useState(null);
    const [jwtToken, setJwtToken] = useState(localStorage.getItem('jwt'));
    const [lots, setLots] = useState([]);
    const [flavorDescriptors, setFlavorDescriptors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingLot, setEditingLot] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newLot, setNewLot] = useState({
        variety: null,
        processing: null,
        department: '',
        aroma: 0,
        flavor: 0,
        aftertaste: 0,
        acidity: 0,
        body: 0,
        balance: 0,
        price: 0,
        description: '',
        flavorDescriptorIds: []
    });
    const [backendErrors, setBackendErrors] = useState({});

    const fetchLotsAndFlavorDescriptors = () => {
        client.getLots()
            .then((lotsJson) => setLots(lotsJson))
            .catch((err) => console.log(err));

        client.getFlavorDescriptors()
            .then(flavorDescriptorsJson => setFlavorDescriptors(flavorDescriptorsJson))
            .catch(err => console.log(err));
    };

    useEffect(() => {
        if (jwtToken) {
            client.getUser(jwtToken)
                .then((userJson) => {
                    setUser(userJson);
                    fetchLotsAndFlavorDescriptors();
                })
                .catch((ignored) => {
                    window.location.href = '/';
                })
                .finally(() => setLoading(false));
        }
    }, [jwtToken]);

    const addFormRef = useRef(null);
    const editFormRef = useRef(null);
    const [isFirstAddOpen, setIsFirstAddOpen] = useState(true);
    const [isFirstEditOpen, setIsFirstEditOpen] = useState(true);

    useEffect(() => {
        if (showAddForm && isFirstAddOpen && addFormRef.current) {
            addFormRef.current.scrollIntoView({behavior: 'smooth', block: 'start'});
            setIsFirstAddOpen(false);
        } else if (!showAddForm) {
            setIsFirstAddOpen(true);
        }
    }, [showAddForm, isFirstAddOpen]);

    useEffect(() => {
        if (editingLot && isFirstEditOpen && editFormRef.current) {
            editFormRef.current.scrollIntoView({behavior: 'smooth', block: 'start'});
            setIsFirstEditOpen(false);
        } else if (!editingLot) {
            setIsFirstEditOpen(true);
        }
    }, [editingLot, isFirstEditOpen]);

    const handleEdit = (lot) => {
        setShowAddForm(false);
        setBackendErrors({});
        setEditingLot({
            ...lot,
            flavorDescriptorIds: lot.flavorDescriptors?.map(d => d.id) || []
        });
    };

    const processBackendErrors = (errorResponse) => {
        const errors = {};

        if (Array.isArray(errorResponse)) {
            errorResponse.forEach(err => {
                const fieldName = err.field || err.fieldName;
                errors[fieldName] = err.defaultMessage || err.message;
            });
        } else if (errorResponse) {
            const parts = errorResponse.split('=-=-=')
            errors[parts[0]] = parts[1];
        }

        return errors;
    };

    const handleSave = () => {
        setBackendErrors({});

        const lotToSave = {
            ...editingLot,
            flavorDescriptors: undefined
        };

        client.updateLot(lotToSave, jwtToken)
            .then(() => {
                fetchLotsAndFlavorDescriptors();
                setEditingLot(null);
            })
            .catch(err => {
                if (err.response?.data) {
                    setBackendErrors(processBackendErrors(err.response.data));
                } else {
                    setBackendErrors({form: 'An unexpected error occurred'});
                }
            });
    };

    const handleDelete = (lotId) => {
        if (window.confirm('Are you sure you want to delete this lot?')) {
            client.deleteLotById(lotId, jwtToken)
                .then(() => {
                    fetchLotsAndFlavorDescriptors();
                })
                .catch(err => console.log(err));
        }
    };

    const handleAdd = () => {
        setBackendErrors({});

        const lotToCreate = {
            ...newLot,
            flavorDescriptors: undefined
        };

        client.create(lotToCreate, jwtToken)
            .then(() => {
                fetchLotsAndFlavorDescriptors();
                setShowAddForm(false);
                setNewLot({
                    variety: '',
                    processing: '',
                    department: '',
                    aroma: 0,
                    flavor: 0,
                    aftertaste: 0,
                    acidity: 0,
                    body: 0,
                    balance: 0,
                    price: 0,
                    description: '',
                    flavorDescriptorIds: []
                });
            })
            .catch(err => {
                if (err.response?.data) {
                    setBackendErrors(processBackendErrors(err.response.data));
                } else {
                    setBackendErrors({form: 'An unexpected error occurred'});
                }
            });
    };

    const toggleDescriptor = (descriptorId) => {
        if (editingLot) {
            const updatedDescriptorIds = editingLot.flavorDescriptorIds.includes(descriptorId)
                ? editingLot.flavorDescriptorIds.filter(id => id !== descriptorId)
                : [...editingLot.flavorDescriptorIds, descriptorId];

            setEditingLot({
                ...editingLot,
                flavorDescriptorIds: updatedDescriptorIds
            });
        } else if (showAddForm) {
            const updatedDescriptorIds = newLot.flavorDescriptorIds.includes(descriptorId)
                ? newLot.flavorDescriptorIds.filter(id => id !== descriptorId)
                : [...newLot.flavorDescriptorIds, descriptorId];

            setNewLot({
                ...newLot,
                flavorDescriptorIds: updatedDescriptorIds
            });
        }
    };

    const getDisplayName = (enumType, value) => {
        const enumEntry = Object.entries(enumType).find(([key]) => key === value);
        return enumEntry ? enumEntry[1].displayName : value;
    };

    const renderFieldError = (fieldName) => {
        return backendErrors[fieldName] ? (
            <div className="error-message">{backendErrors[fieldName]}</div>
        ) : null;
    };

    const renderFormError = () => {
        return backendErrors.form ? (
            <div className="form-error">{backendErrors.form}</div>
        ) : null;
    };

    if (loading && jwtToken) {
        return <div className="loading">Loading...</div>;
    }

    return (
        user ? (
            <div className="admin-container">
                <div className='admin-header'>
                    <h1>Welcome, {user.login}!</h1>
                    <button
                        className="add-lot-btn"
                        onClick={() => {
                            setShowAddForm(true);
                            setEditingLot(false);
                        }}>
                        Add New Lot
                    </button>
                </div>

                {showAddForm && (
                    <div className="lot-form" ref={addFormRef}>
                        <h2>Add New Lot</h2>
                        {renderFormError()}
                        <div className="form-group">
                            <label>Variety:</label>
                            <select
                                required={true}
                                value={newLot.variety}
                                onChange={(e) => setNewLot({...newLot, variety: e.target.value})}
                                className={backendErrors.variety ? 'error-field' : ''}
                            >
                                <option value="">Select variety</option>
                                {Object.keys(LotVariety).map(key => (
                                    <option key={key} value={key}>
                                        {LotVariety[key].displayName}
                                    </option>
                                ))}
                            </select>
                            {renderFieldError('variety')}
                        </div>

                        <div className="form-group">
                            <label>Processing:</label>
                            <select
                                required={true}
                                value={newLot.processing}
                                onChange={(e) => setNewLot({...newLot, processing: e.target.value})}
                                className={backendErrors.processing ? 'error-field' : ''}
                            >
                                <option value="">Select processing</option>
                                {Object.keys(LotProcessing).map(key => (
                                    <option key={key} value={key}>
                                        {LotProcessing[key].displayName}
                                    </option>
                                ))}
                            </select>
                            {renderFieldError('processing')}
                        </div>

                        <div className="form-group">
                            <label>Department:</label>
                            <input
                                type="text"
                                value={newLot.department}
                                onChange={(e) => setNewLot({...newLot, department: e.target.value})}
                                className={backendErrors.department ? 'error-field' : ''}
                            />
                            {renderFieldError('department')}
                        </div>

                        <div className="form-group">
                            <label>Aroma:</label>
                            <input
                                type="number"
                                step="0.1"
                                min="0"
                                max="10"
                                value={newLot.aroma}
                                onChange={(e) => setNewLot({...newLot, aroma: parseFloat(e.target.value)})}
                                className={backendErrors.aroma ? 'error-field' : ''}
                            />
                            {renderFieldError('aroma')}
                        </div>

                        <div className="form-group">
                            <label>Flavor:</label>
                            <input
                                type="number"
                                step="0.1"
                                min="0"
                                max="10"
                                value={newLot.flavor}
                                onChange={(e) => setNewLot({...newLot, flavor: parseFloat(e.target.value)})}
                                className={backendErrors.flavor ? 'error-field' : ''}
                            />
                            {renderFieldError('flavor')}
                        </div>

                        <div className="form-group">
                            <label>Aftertaste:</label>
                            <input
                                type="number"
                                step="0.1"
                                min="0"
                                max="10"
                                value={newLot.aftertaste}
                                onChange={(e) => setNewLot({...newLot, aftertaste: parseFloat(e.target.value)})}
                                className={backendErrors.aftertaste ? 'error-field' : ''}
                            />
                            {renderFieldError('aftertaste')}
                        </div>

                        <div className="form-group">
                            <label>Acidity:</label>
                            <input
                                type="number"
                                step="0.1"
                                min="0"
                                max="10"
                                value={newLot.acidity}
                                onChange={(e) => setNewLot({...newLot, acidity: parseFloat(e.target.value)})}
                                className={backendErrors.acidity ? 'error-field' : ''}
                            />
                            {renderFieldError('acidity')}
                        </div>

                        <div className="form-group">
                            <label>Body:</label>
                            <input
                                type="number"
                                step="0.1"
                                min="0"
                                max="10"
                                value={newLot.body}
                                onChange={(e) => setNewLot({...newLot, body: parseFloat(e.target.value)})}
                                className={backendErrors.body ? 'error-field' : ''}
                            />
                            {renderFieldError('body')}
                        </div>

                        <div className="form-group">
                            <label>Balance:</label>
                            <input
                                type="number"
                                step="0.1"
                                min="0"
                                max="10"
                                value={newLot.balance}
                                onChange={(e) => setNewLot({...newLot, balance: parseFloat(e.target.value)})}
                                className={backendErrors.balance ? 'error-field' : ''}
                            />
                            {renderFieldError('balance')}
                        </div>

                        <div className="form-group">
                            <label>Price:</label>
                            <input
                                type="number"
                                min="0"
                                value={newLot.price}
                                onChange={(e) => setNewLot({...newLot, price: parseFloat(e.target.value)})}
                                className={backendErrors.price ? 'error-field' : ''}
                            />
                            {renderFieldError('price')}
                        </div>

                        <div className="form-group">
                            <label>Description:</label>
                            <textarea
                                value={newLot.description}
                                onChange={(e) => setNewLot({...newLot, description: e.target.value})}
                                className={backendErrors.description ? 'error-field' : ''}
                            />
                            {renderFieldError('description')}
                        </div>

                        <div className="form-group">
                            <label>Flavor Descriptors:</label>
                            <div className="descriptors-grid">
                                {flavorDescriptors.map(descriptor => (
                                    <div
                                        key={descriptor.id}
                                        className={`descriptor-tag ${newLot.flavorDescriptorIds.includes(descriptor.id) ? 'selected' : 'not-selected'}`}
                                        style={{backgroundColor: newLot.flavorDescriptorIds.includes(descriptor.id) ? descriptor.colorHex : '#f0f0f0'}}
                                        onClick={() => toggleDescriptor(descriptor.id)}
                                    >
                                        <span className="descriptor-name">{descriptor.name}</span>
                                        {newLot.flavorDescriptorIds.includes(descriptor.id) && (
                                            <span className="checkmark">✓</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                            {renderFieldError('flavorDescriptorIds')}
                        </div>

                        <div className="form-actions">
                            <button className="save-btn" onClick={handleAdd}>Save</button>
                            <button className="cancel-btn" onClick={() => setShowAddForm(false)}>Cancel</button>
                        </div>
                    </div>
                )}

                {editingLot && (
                    <div className="lot-form" ref={editFormRef}>
                        <h2>Edit Lot</h2>
                        {renderFormError()}
                        <div className="form-group">
                            <label>Variety:</label>
                            <select
                                value={editingLot.variety}
                                onChange={(e) => setEditingLot({...editingLot, variety: e.target.value})}
                                className={backendErrors.variety ? 'error-field' : ''}
                            >
                                {Object.keys(LotVariety).map(key => (
                                    <option key={key} value={key}>
                                        {LotVariety[key].displayName}
                                    </option>
                                ))}
                            </select>
                            {renderFieldError('variety')}
                        </div>

                        <div className="form-group">
                            <label>Processing:</label>
                            <select
                                value={editingLot.processing}
                                onChange={(e) => setEditingLot({...editingLot, processing: e.target.value})}
                                className={backendErrors.processing ? 'error-field' : ''}
                            >
                                {Object.keys(LotProcessing).map(key => (
                                    <option key={key} value={key}>
                                        {LotProcessing[key].displayName}
                                    </option>
                                ))}
                            </select>
                            {renderFieldError('processing')}
                        </div>

                        <div className="form-group">
                            <label>Department:</label>
                            <input
                                type="text"
                                value={editingLot.department}
                                onChange={(e) => setEditingLot({...editingLot, department: e.target.value})}
                                className={backendErrors.department ? 'error-field' : ''}
                            />
                            {renderFieldError('department')}
                        </div>

                        <div className="form-group">
                            <label>Aroma:</label>
                            <input
                                type="number"
                                step="0.1"
                                min="0"
                                max="10"
                                value={editingLot.aroma}
                                onChange={(e) => setEditingLot({...editingLot, aroma: parseFloat(e.target.value)})}
                                className={backendErrors.aroma ? 'error-field' : ''}
                            />
                            {renderFieldError('aroma')}
                        </div>

                        <div className="form-group">
                            <label>Flavor:</label>
                            <input
                                type="number"
                                step="0.1"
                                min="0"
                                max="10"
                                value={editingLot.flavor}
                                onChange={(e) => setEditingLot({...editingLot, flavor: parseFloat(e.target.value)})}
                                className={backendErrors.flavor ? 'error-field' : ''}
                            />
                            {renderFieldError('flavor')}
                        </div>

                        <div className="form-group">
                            <label>Aftertaste:</label>
                            <input
                                type="number"
                                step="0.1"
                                min="0"
                                max="10"
                                value={editingLot.aftertaste}
                                onChange={(e) => setEditingLot({...editingLot, aftertaste: parseFloat(e.target.value)})}
                                className={backendErrors.aftertaste ? 'error-field' : ''}
                            />
                            {renderFieldError('aftertaste')}
                        </div>

                        <div className="form-group">
                            <label>Acidity:</label>
                            <input
                                type="number"
                                step="0.1"
                                min="0"
                                max="10"
                                value={editingLot.acidity}
                                onChange={(e) => setEditingLot({...editingLot, acidity: parseFloat(e.target.value)})}
                                className={backendErrors.acidity ? 'error-field' : ''}
                            />
                            {renderFieldError('acidity')}
                        </div>

                        <div className="form-group">
                            <label>Body:</label>
                            <input
                                type="number"
                                step="0.1"
                                min="0"
                                max="10"
                                value={editingLot.body}
                                onChange={(e) => setEditingLot({...editingLot, body: parseFloat(e.target.value)})}
                                className={backendErrors.body ? 'error-field' : ''}
                            />
                            {renderFieldError('body')}
                        </div>

                        <div className="form-group">
                            <label>Balance:</label>
                            <input
                                type="number"
                                step="0.1"
                                min="0"
                                max="10"
                                value={editingLot.balance}
                                onChange={(e) => setEditingLot({...editingLot, balance: parseFloat(e.target.value)})}
                                className={backendErrors.balance ? 'error-field' : ''}
                            />
                            {renderFieldError('balance')}
                        </div>

                        <div className="form-group">
                            <label>Price:</label>
                            <input
                                type="number"
                                min="0"
                                value={editingLot.price}
                                onChange={(e) => setEditingLot({...editingLot, price: parseFloat(e.target.value)})}
                                className={backendErrors.price ? 'error-field' : ''}
                            />
                            {renderFieldError('price')}
                        </div>

                        <div className="form-group">
                            <label>Description:</label>
                            <textarea
                                value={editingLot.description}
                                onChange={(e) => setEditingLot({...editingLot, description: e.target.value})}
                                className={backendErrors.description ? 'error-field' : ''}
                            />
                            {renderFieldError('description')}
                        </div>

                        <div className="form-group">
                            <label>Flavor Descriptors:</label>
                            <div className="descriptors-grid">
                                {flavorDescriptors.map(descriptor => (
                                    <div
                                        key={descriptor.id}
                                        className={`descriptor-tag ${editingLot.flavorDescriptorIds.includes(descriptor.id) ? 'selected' : 'not-selected'}`}
                                        style={{backgroundColor: editingLot.flavorDescriptorIds.includes(descriptor.id) ? descriptor.colorHex : '#f0f0f0'}}
                                        onClick={() => toggleDescriptor(descriptor.id)}
                                    >
                                        <span className="descriptor-name">{descriptor.name}</span>
                                        {editingLot.flavorDescriptorIds.includes(descriptor.id) && (
                                            <span className="checkmark">✓</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                            {renderFieldError('flavorDescriptorIds')}
                        </div>

                        <div className="form-actions">
                            <button className="save-btn" onClick={handleSave}>Save</button>
                            <button className="cancel-btn" onClick={() => setEditingLot(null)}>Cancel</button>
                        </div>
                    </div>
                )}

                <div className="lots-table">
                    <table>
                        <thead>
                        <tr>
                            <th>Variety</th>
                            <th>Processing</th>
                            <th>Department</th>
                            <th>Descriptors</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {lots.map(lot => (
                            <tr key={lot.id}>
                                <td>{getDisplayName(LotVariety, lot.variety)}</td>
                                <td>{getDisplayName(LotProcessing, lot.processing)}</td>
                                <td>{lot.department}</td>
                                <td>
                                    <div className="descriptors-list">
                                        {lot.flavorDescriptors?.map(descriptor => (
                                            <span
                                                key={descriptor.id}
                                                className="descriptor-tag"
                                                style={{backgroundColor: descriptor.colorHex}}
                                            >
                                                {descriptor.name}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td>${lot.price?.toFixed(2)}</td>
                                <td>
                                    <button className="edit-btn" onClick={() => handleEdit(lot)}>Edit</button>
                                    <button className="delete-btn" onClick={() => handleDelete(lot.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        ) : (
            <LoginForm setUser={setUser} setJwtToken={setJwtToken}/>
        )
    );
};

const LotVariety = {
    GEISHA: {displayName: "Geisha"},
    PINK_BOURBON: {displayName: "Pink bourbon"},
    YELLOW_BOURBON: {displayName: "Yellow bourbon"},
    RED_BOURBON: {displayName: "Red bourbon"},
    BOURBON_SIDRA: {displayName: "Bourbon sidra"},
    RUME_SUDAN: {displayName: "Rume Sudán"},
    CATURRA: {displayName: "Caturra"},
    CATURRA_CHIROSO: {displayName: "Caturra chiroso"},
    CASTILLO: {displayName: "Castillo"},
    SL_28: {displayName: "SL 28"},
    LAURINA: {displayName: "Laurina"},
    COLOMBIA: {displayName: "Colombia"},
    JAVA: {displayName: "Java"},
    YIRGACHEFFE: {displayName: "Yirgacheffe"}
};

const LotProcessing = {
    NATURAL: {displayName: "Natural"},
    NATURAL_ANAEROBIC: {displayName: "Natural anaerobic"},
    HONEY: {displayName: "Honey"},
    HONEY_ANAEROBIC: {displayName: "Honey anaerobic"},
    WASHED: {displayName: "Washed"},
    SEMI_WASHED: {displayName: "Semi washed"},
    CULTURING: {displayName: "Culturing"}
};

export default AdminPage;