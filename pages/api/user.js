import {fetcher} from "@/lib/api";

const CMS_URL = process.env.CMS_URL;

async function handleUser(req, res) {
  const {jwt} = req.cookies;
  if (!jwt) {
    res.status(401).end();
    return;
  }

  try {
    const user = await fetcher(`${CMS_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      },
    })

    return res.status(200).json({
      id: user.id,
      name: user.username,
    });
  } catch (error) {
    res.status(401).end();
  }
}

export default handleUser
