import { AuthForm } from 'components';
import { MainLayout } from 'layouts';

const LoginPage = () => {
  const onSubmit = () => console.log('x');

  return (
    <MainLayout user={undefined}>
      <AuthForm onSubmit={onSubmit} />
    </MainLayout>
  );
};

export default LoginPage;
