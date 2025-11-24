import React, { useEffect, useState } from 'react';
import Navbar from "../../components/Navbar";
import { Modal } from "../../components/common/Modal";
import type {Student, CreateStudentDto} from '../../../domain/entities/Student';
import type{ Guardian } from '../../../domain/entities/Guardian';
import { StudentRepositoryImpl } from '../../../infrastructure/repositories/StudentRepositoryImpl';
import { GuardianRepositoryImpl } from '../../../infrastructure/repositories/GuardianRepositoryImpl';

// --- ICONS & SPINNER ---
const Spinner = ({ color = "text-white", size = "h-5 w-5" }) => (
    <svg className={`animate-spin -ml-1 mr-2 ${size} ${color}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
    </svg>
);

const LinkIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
);

const TrashIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
);

export default function ManageStudentsPage() {
    const [students, setStudents] = useState<Student[]>([]);
    const [loadingData, setLoadingData] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    // Repositories
    const studentRepo = new StudentRepositoryImpl();
    const guardianRepo = new GuardianRepositoryImpl();

    // --- FORM STATE ---
    const [showFormModal, setShowFormModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentStudent, setCurrentStudent] = useState<Partial<Student>>({});
    const [formError, setFormError] = useState<string | null>(null);

    // --- RELATIONSHIP BROWSER STATE ---
    const [showRelationModal, setShowRelationModal] = useState(false);
    const [selectedStudentForRel, setSelectedStudentForRel] = useState<Student | null>(null);

    // Step 1: Browse
    const [availableGuardians, setAvailableGuardians] = useState<Guardian[]>([]);
    const [guardianSearchTerm, setGuardianSearchTerm] = useState("");

    // Step 2: Confirm & Add Attribute
    const [selectedGuardianForRel, setSelectedGuardianForRel] = useState<Guardian | null>(null);
    const [relationshipType, setRelationshipType] = useState("Padre");
    const [customRelationship, setCustomRelationship] = useState("");

    // Load Students
    const fetchStudents = async () => {
        setLoadingData(true);
        try {
            const data = await studentRepo.findAll();
            setStudents(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingData(false);
        }
    };

    useEffect(() => { fetchStudents(); }, []);

    // --- HANDLERS: DELETE ---
    const handleDelete = async (id: number) => {
        if (!window.confirm("¿Estás seguro de eliminar este estudiante?")) return;
        setDeletingId(id);
        try {
            await studentRepo.delete(id);
            await fetchStudents();
        } catch (err: any) {
            alert("Error al eliminar: " + err.message);
        } finally {
            setDeletingId(null);
        }
    };

    // --- HANDLERS: FORM ---
    const openCreate = () => {
        setFormError(null);
        setCurrentStudent({ gender: 'M' });
        setIsEditing(false);
        setShowFormModal(true);
    };

    const openEdit = (student: Student) => {
        setFormError(null);
        setCurrentStudent({ ...student });
        setIsEditing(true);
        setShowFormModal(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);
        setIsSaving(true);
        try {
            if (isEditing && currentStudent.studentId) {
                await studentRepo.update(currentStudent.studentId, currentStudent);
            } else {
                if (!currentStudent.enrollmentNumber) throw new Error("Matrícula requerida");
                await studentRepo.create(currentStudent as CreateStudentDto);
            }
            setShowFormModal(false);
            fetchStudents();
        } catch (err: any) {
            setFormError(err.message || "Error al guardar");
        } finally {
            setIsSaving(false);
        }
    };

    // --- HANDLERS: RELATIONSHIP ---
    const openRelationBrowser = async (student: Student) => {
        setSelectedStudentForRel(student);
        setSelectedGuardianForRel(null);
        setRelationshipType("Padre");
        setCustomRelationship("");
        try {
            const guardians = await guardianRepo.findAll();
            setAvailableGuardians(guardians);
            setShowRelationModal(true);
        } catch (error) {
            alert("Error cargando lista de tutores");
        }
    };

    const confirmRelationship = async () => {
        if (!selectedStudentForRel?.studentId || !selectedGuardianForRel?.guardianId) return;

        let finalRelationship = relationshipType;
        if (relationshipType === "Otro") {
            if (!customRelationship.trim()) {
                alert("Por favor especifique el parentesco manual.");
                return;
            }
            finalRelationship = customRelationship;
        }

        const payload = {
            studentId: selectedStudentForRel.studentId,
            guardianId: selectedGuardianForRel.guardianId,
            relationship: finalRelationship
        };

        // TODO: Call your actual Repository/UseCase here
        console.log("SENDING PAYLOAD:", payload);
        alert(`Relación creada exitosamente: ${finalRelationship}`);

        setShowRelationModal(false);
    };

    const filteredGuardians = availableGuardians.filter(g =>
        g.firstName.toLowerCase().includes(guardianSearchTerm.toLowerCase()) ||
        (g.lastNamePaternal && g.lastNamePaternal.toLowerCase().includes(guardianSearchTerm.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">Gestión de Estudiantes</h2>
                    <button onClick={openCreate} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow">+ Nuevo Estudiante</button>
                </div>

                {/* Table */}
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    {loadingData ? <div className="p-4 text-center">Cargando...</div> : (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Matrícula</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {students.map((s) => (
                                <tr key={s.studentId} className="hover:bg-gray-50">
                                    <td className="px-6 py-4"><span className="bg-green-100 text-green-800 rounded px-2">{s.enrollmentNumber}</span></td>
                                    <td className="px-6 py-4 font-medium">{s.firstName} {s.lastNamePaternal}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end items-center space-x-3">

                                        {/* Relation Button */}
                                        <button
                                            onClick={() => openRelationBrowser(s)}
                                            className="text-teal-600 hover:text-teal-900 flex items-center tooltip"
                                            title="Añadir relación con Tutor"
                                        >
                                            <LinkIcon /> <span className="ml-1">Relación</span>
                                        </button>

                                        {/* Edit Button */}
                                        <button onClick={() => openEdit(s)} className="text-indigo-600 hover:text-indigo-900">Editar</button>

                                        {/* Delete Button */}
                                        <button
                                            onClick={() => s.studentId && handleDelete(s.studentId)}
                                            disabled={deletingId === s.studentId}
                                            className="text-red-600 hover:text-red-900 disabled:opacity-50"
                                        >
                                            {deletingId === s.studentId ? <Spinner color="text-red-600" size="h-4 w-4" /> : <TrashIcon />}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* --- MODAL 1: FORM --- */}
            <Modal
                isOpen={showFormModal}
                onClose={() => setShowFormModal(false)}
                title={isEditing ? 'Editar Estudiante' : 'Registrar Nuevo Estudiante'}
                maxWidth="max-w-3xl"
            >
                {formError && <div className="bg-red-50 text-red-700 p-3 rounded mb-4">{formError}</div>}
                <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Matrícula" className="border p-2 rounded" value={currentStudent.enrollmentNumber||''} onChange={e=>setCurrentStudent({...currentStudent, enrollmentNumber:e.target.value})} />
                    <input type="text" placeholder="Nombre" className="border p-2 rounded" value={currentStudent.firstName||''} onChange={e=>setCurrentStudent({...currentStudent, firstName:e.target.value})} />
                    <input type="text" placeholder="Apellido P." className="border p-2 rounded" value={currentStudent.lastNamePaternal||''} onChange={e=>setCurrentStudent({...currentStudent, lastNamePaternal:e.target.value})} />
                    <div className="md:col-span-2 flex justify-end gap-2 mt-4">
                        <button type="button" onClick={() => setShowFormModal(false)} className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
                        <button type="submit" disabled={isSaving} className="px-4 py-2 bg-blue-600 text-white rounded flex items-center">
                            {isSaving && <Spinner />} Guardar
                        </button>
                    </div>
                </form>
            </Modal>

            {/* --- MODAL 2: RELATIONSHIP WIZARD --- */}
            <Modal
                isOpen={showRelationModal}
                onClose={() => setShowRelationModal(false)}
                title={selectedGuardianForRel ? "Confirmar Vínculo" : `Buscar Tutor para ${selectedStudentForRel?.firstName}`}
                maxWidth="max-w-3xl"
            >
                {!selectedGuardianForRel ? (
                    // STEP 1: BROWSE GUARDIANS
                    <div className="flex flex-col h-[50vh]">
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Buscar tutor por nombre..."
                                className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                value={guardianSearchTerm}
                                onChange={(e) => setGuardianSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex-1 overflow-y-auto border rounded border-gray-200">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50 sticky top-0">
                                <tr>
                                    <th className="px-4 py-2 text-left text-xs text-gray-500 uppercase">Nombre</th>
                                    <th className="px-4 py-2 text-left text-xs text-gray-500 uppercase">Contacto</th>
                                    <th className="px-4 py-2 text-right">Acción</th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {filteredGuardians.map(g => (
                                    <tr key={g.guardianId} className="hover:bg-blue-50">
                                        <td className="px-4 py-2 text-sm font-medium">{g.firstName} {g.lastNamePaternal}</td>
                                        <td className="px-4 py-2 text-sm text-gray-500">{g.email}</td>
                                        <td className="px-4 py-2 text-right">
                                            <button
                                                onClick={() => setSelectedGuardianForRel(g)}
                                                className="bg-blue-600 text-white text-xs px-3 py-1 rounded hover:bg-blue-700 transition"
                                            >
                                                Seleccionar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    // STEP 2: DEFINE RELATIONSHIP ATTRIBUTE
                    <div className="space-y-6 p-4">
                        <div className="bg-blue-50 p-4 rounded border border-blue-200">
                            <p className="text-sm text-blue-800">Estás vinculando al estudiante:</p>
                            <p className="font-bold text-lg">{selectedStudentForRel?.firstName} {selectedStudentForRel?.lastNamePaternal}</p>
                            <div className="flex justify-center my-2 text-gray-400">⬇️ con el tutor ⬇️</div>
                            <p className="font-bold text-lg text-right">{selectedGuardianForRel.firstName} {selectedGuardianForRel.lastNamePaternal}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Parentesco / Relación</label>
                            <select
                                value={relationshipType}
                                onChange={(e) => setRelationshipType(e.target.value)}
                                className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="Padre">Padre</option>
                                <option value="Madre">Madre</option>
                                <option value="Tutor">Tutor Legal</option>
                                <option value="Abuelo">Abuelo/a</option>
                                <option value="Tio">Tío/a</option>
                                <option value="Otro">Otro (Especificar)</option>
                            </select>

                            {relationshipType === "Otro" && (
                                <div className="mt-3 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Especifique el parentesco:</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Ej: Padrino, Vecino, Tía Abuela..."
                                        className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                        value={customRelationship}
                                        onChange={(e) => setCustomRelationship(e.target.value)}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                onClick={() => setSelectedGuardianForRel(null)}
                                className="text-gray-600 hover:text-gray-800 px-4 py-2"
                            >
                                Atrás
                            </button>
                            <button
                                onClick={confirmRelationship}
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow transition"
                            >
                                Confirmar Vínculo
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}