import { signInWithPopup } from 'firebase/auth';
import { signIn, useSession, signOut } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { firebaseAuth, googleProvider } from 'utils';

export default function Home() {
  const { data, update } = useSession();
  const { register, handleSubmit } = useForm();

  console.log(data);

  const onSubmit = async (data: any) => {
    await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    });
  };

  const onSubmitGoogle = async () => {
    const res = await signInWithPopup(firebaseAuth, googleProvider);
    update({ user: res.user });
  };

  return (
    <main className="bg-slate-700 p-10">
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <input type="email" {...register('email')} />
        <input type="password" {...register('password')} />
        <button type="submit">login</button>
        <button type="button" onClick={onSubmitGoogle}>
          google
        </button>
        <button onClick={() => signOut()}>signOut</button>
      </form>
    </main>
  );
}

