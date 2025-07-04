import { useEffect, useState } from 'react';
import { BackButton } from './BackButton';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ChevronLeft, ChevronRight } from "lucide-react"

const API_URL = import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:3000"

type AuditLogEntry = {
  _id: string;
  user?: { email?: string; _id?: string } | string;
  action: string;
  date: string;
  details: Record<string, unknown> | string;
};

function AuditLog() {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(`${API_URL}/api/audit`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        const text = await res.text();
        if (!res.ok) throw new Error(text);
        return JSON.parse(text);
      })
      .then((data) => setLogs(data))
      .catch((err) => {
        console.error(' Error al traer logs:', err.message);
      });
  }, [token]);

  const renderDetails = (details: Record<string, unknown> | string) => {
    if (typeof details === 'string') return details;
    if (!details || typeof details !== 'object') return 'N/A';

    const camposPermitidos = [
      'name', 'email', 'createdBy', 'updatedBy', 'deletedBy',
      'dishId', 'updatedUserId', 'createdUserId', 'deletedUserId'
    ];

    return Object.entries(details)
      .filter(([key]) => camposPermitidos.includes(key))
      .map(([key, value]) => `${key}: ${String(value)}`)
      .join(' | ');
  };

  const sortedLogs = logs.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const totalPages = Math.ceil(sortedLogs.length / itemsPerPage);
  const paginatedLogs = sortedLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Botón volver arriba a la izquierda */}
        <div className="flex items-center">
          <div>
            <BackButton url='/users'/>
          </div>
        </div>

        {/* Título y subtítulo centrados y con margen superior */}
        <div className="flex flex-col items-center gap-4 mt-14 mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white text-center">Registro de Auditoría</h1>
          <p className="text-gray-400 text-base sm:text-lg text-center">Historial de acciones realizadas en el sistema</p>
        </div>

        <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-x-auto">
          <Table className="min-w-[700px]">
            <TableHeader>
              <TableRow className="hover:bg-gray-700/50 border-zinc-600">
                <TableHead className="text-white">Fecha</TableHead>
                <TableHead className="text-white">Usuario</TableHead>
                <TableHead className="text-white">Acción</TableHead>
                <TableHead className="text-white">Detalles</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedLogs.map((log) => (
                <TableRow key={log._id} className="hover:bg-gray-700/50 border-zinc-600">
                  <TableCell className="text-white text-left">
                    {new Date(log.date).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-gray-400 text-left">
                    {typeof log.user === 'object'
                      ? log.user?.email || log.user?._id || 'Desconocido'
                      : log.user || 'Desconocido'}
                  </TableCell>
                  <TableCell className="text-white text-left">
                    {log.action}
                  </TableCell>
                  <TableCell className="text-gray-400 text-left whitespace-pre-wrap break-words max-w-[400px]">
                    {renderDetails(log.details)}
                  </TableCell>
                </TableRow>
              ))}

              {logs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4 text-gray-400">
                    No hay registros de auditoría disponibles.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* PAGINACIÓN */}
        <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-gray-400 text-sm text-center">
            Mostrando{" "}
            <strong className="text-white">{logs.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</strong> -{" "}
            <strong className="text-white">{Math.min(currentPage * itemsPerPage, logs.length)}</strong> de{" "}
            <strong className="text-white">{logs.length}</strong> registros
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 transition-opacity flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-3 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 transition-opacity flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuditLog;
