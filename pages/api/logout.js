import cookie from "cookie";

const handleLogout = (req, res) => {
  res
    .status(200)
    .setHeader('Set-Cookie', cookie.serialize('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
      path: "/api"
    })).json({})
}

export default handleLogout