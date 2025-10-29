export default function ProtectedButton({ roles, userRole, children }) {
  if (!roles.includes(userRole)) return null;
  return children;
}

/** USE EXAMPLE:
 * <ProtectedButton roles={["admin", "editor"]} userRole={user.role}>
  <Button variant="contained">Slet Produkt</Button>
</ProtectedButton>
  */
