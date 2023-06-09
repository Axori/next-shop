import {fetcher} from "@/lib/api";
import cookie from "cookie";

const CMS_URL = process.env.CMS_URL;

async function handleLogin(req, res) {
  const {method} = req;

  switch (method) {
    case "POST":
      const {email, password} = req.body;
      try {
        const {jwt, user} = await fetcher(`${CMS_URL}/auth/local`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({identifier: email, password})
        })

        res.status(200)
          .setHeader('Set-Cookie', cookie.serialize('jwt', jwt, {
            httpOnly: true,
            path: "/api"
          }))
          .json({
            user: {
              id: user.id,
              name: user.username,
            }
          });
      } catch (error) {
        res.status(401).end();
      }
      break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export default handleLogin