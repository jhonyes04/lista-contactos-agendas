export const DeleteConfirmModal = ({
    abierto,
    confirmar,
    cancelar,
    nombreContacto,
}) => {
    if (!abierto) return;

    return (
        <div
            className="modal d-block"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
            tabIndex={-1}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header bg-light">
                        <h5 className="modal-title">Confirmar eliminar</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={cancelar}
                        ></button>
                    </div>
                    <div className="modal-body text-center">
                        <i className="fa-solid fa-triangle-exclamation fa-5x text-warning mb-4"></i>
                        <div className="text-center">
                            <p>
                                ¿Seguro que desea eliminar a{' '}
                                <strong>{nombreContacto}</strong>?
                            </p>
                            <p className="text-danger fw-bold fs-5">
                                ¡¡¡Esta acción no se podrá deshacer!!!
                            </p>
                        </div>
                    </div>
                    <div className="modal-footer bg-light justify-content-center">
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={cancelar}
                        >
                            <i className="fa-solid fa-circle-xmark me-2"></i>
                            Cancelar
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={confirmar}
                        >
                            <i className="fa-solid fa-trash-can me-2"></i>
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
