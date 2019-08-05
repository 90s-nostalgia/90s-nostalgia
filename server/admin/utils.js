function adminPrivileges(req, res, next) {
  if (req.user.isAdmin) next()
}

module.exports = adminPrivileges
