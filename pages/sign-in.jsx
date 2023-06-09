import Page from "@/components/Page";
import {Input} from "@/components/Input";
import {Field} from "@/components/Field";
import {Button} from "@/components/Button";
import {useState} from "react";
import {fetcher} from "@/lib/api";
import {useRouter} from "next/router";

function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({error: false, loading: false});

  const handleOnSubmit = async event => {
    event.preventDefault();
    setStatus({error: false, loading: true});

    try {
      await fetcher('/api/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
      })
      setStatus({error: false, loading: false});
      await router.push('/');
    } catch (e) {
      setStatus({error: true, loading: false});
    }
  };

  return (
    <Page title="Sign In">
      <form onSubmit={handleOnSubmit}>
        <Field label="Email">
          <Input type="email" required value={email} onChange={e => setEmail(e.target.value)}/>
        </Field>

        <Field label="Password">
          <Input type="password" required value={password} onChange={e => setPassword(e.target.value)}/>
        </Field>

        {status.error && <p className="text-red-500">Invalid credentials</p>}
        <Button type="submit" loading={status.loading}>
          Sign In
        </Button>
      </form>
    </Page>
  )
}

export default SignIn