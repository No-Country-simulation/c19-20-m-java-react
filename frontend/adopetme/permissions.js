const permissions = {
  users: {
    create: true, // Cualquier usuario puede crear
    read: true, // Cualquier usuario puede leer
    update: ["user", "admin"], // Solo los admins pueden actualizar
    delete: ["user", "admin"], // Solo los admins pueden eliminar
  },
  pets: {
    create: ["user", "admin"], // Usuarios y admins pueden crear
    read: true, // Todos pueden leer
    update: ["user", "admin"], // Solo los admins pueden actualizar
    delete: ["user", "admin"], // Solo los admins pueden eliminar
  },
};

module.exports = permissions;
