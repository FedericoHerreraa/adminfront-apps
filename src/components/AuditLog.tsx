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

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

type AuditLogEntry = {
  _id: string;
  user?: { email?: string; _id?: string } | string;
  action: string;
  date: string;
  details: Record<string, unknown> | string;
};

function AuditLog() {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
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
        console.error('❌ Error al traer logs:', err.message);
      });
  }, [token]);

const renderDetails = (details: Record<string, unknown> | string) => {
  if (typeof details === 'string') return details;

  const camposPermitidos = [
    'name', 'email', 'createdBy', 'updatedBy', 'deletedBy',
    'dishId', 'updatedUserId', 'createdUserId', 'deletedUserId'
  ];

  return Object.entries(details)
    .filter(([key]) => camposPermitidos.includes(key))
    .map(([key, value]) => `${key}: ${String(value)}`)
    .join(' | ');
};

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-6">
      <BackButton url='/users'/>
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-8 mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Registro de Auditoría</h1>
          <p className="text-gray-400 text-lg">Historial de acciones realizadas en el sistema</p>
        </div>

        <div className="bg-gray-800/50 rounded-xl border border-gray-700">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-gray-700/50 border-zinc-600">
                <TableHead className="text-white">Fecha</TableHead>
                <TableHead className="text-white">Usuario</TableHead>
                <TableHead className="text-white">Acción</TableHead>
                <TableHead className="text-white">Detalles</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
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
      </div>
    </div>
  );
}

export default AuditLog;
