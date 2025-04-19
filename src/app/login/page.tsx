import LoginForm from '../../components/ui/LoginForm';
import Illustration from '../../components/ui/Illustration';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col md:flex-row bg-white shadow-2xl rounded-3xl overflow-hidden">
        <Illustration />
        <LoginForm />
      </div>
    </div>
  );
}
