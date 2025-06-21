import { useEffect, useState } from 'react';

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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-6 pt-24">
      <div className="max-w-6xl mx-auto bg-zinc-800 p-8 rounded-xl shadow-lg shadow-[#B8860B]/30 animate-fade-in">
        <h2 className="text-3xl font-bold text-center mb-8 text-zinc-300 font-serif">
          Registro de Auditoría
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-zinc-600 text-sm">
            <thead className="bg-zinc-700 text-white">
              <tr>
                <th className="border border-zinc-600 px-4 py-2">Fecha</th>
                <th className="border border-zinc-600 px-4 py-2">Usuario</th>
                <th className="border border-zinc-600 px-4 py-2">Acción</th>
                <th className="border border-zinc-600 px-4 py-2">Detalles</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log._id} className="hover:bg-zinc-700 transition-colors">
                  <td className="border border-zinc-600 px-4 py-2 text-center">
                    {new Date(log.date).toLocaleString()}
                  </td>
                  <td className="border border-zinc-600 px-4 py-2 text-center">
                    {typeof log.user === 'object'
                      ? log.user?.email || log.user?._id || 'Desconocido'
                      : log.user || 'Desconocido'}
                  </td>
                  <td className="border border-zinc-600 px-4 py-2 text-center">
                    {log.action}
                  </td>
                  <td className="border border-zinc-600 px-4 py-2 text-left whitespace-pre-wrap break-words max-w-[400px]">
                    {renderDetails(log.details)}
                  </td>
                </tr>
              ))}

              {logs.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-zinc-400">
                    No hay registros de auditoría disponibles.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AuditLog;
