import Page from "@/components/Page";
import {Input} from "@/components/Input";
import {Field} from "@/components/Field";
import {Button} from "@/components/Button";
import {useState} from "react";
import {useRouter} from "next/router";
import {useSignIn} from "@/hooks/user";

function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {isError, isLoading, signIn} = useSignIn()

  const handleOnSubmit = async event => {
    event.preventDefault();
    const isValid = await signIn(email, password)
    if (isValid)
      await router.push('/')
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

        {isError && <p className="text-red-500">Invalid credentials</p>}
        <Button type="submit" loading={isLoading}>
          Sign In
        </Button>
      </form>
    </Page>
  )
}

export default SignIn