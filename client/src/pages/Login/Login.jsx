import { z } from 'zod';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '../../hooks/query/sessionQuery';
import { Container, Form } from './Styles';

const validationSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({
      message: 'Must be a valid email',
    })
    .trim(),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional().default(false),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
  });

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const {
    mutate: login,
    error,
    isLoading,
  } = useLogin({
    onSuccess: () => navigate(from, { replace: true }),
  });
  const onSubmit = (data) => login(data);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="text" {...register('email')} />
          <p>{errors.email?.message}</p>
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            {...register('password')}
          />
          <p>{errors.password?.message}</p>
        </div>

        <div>
          <label htmlFor="rememberMe">Remember me</label>
          <input
            id="rememberMe"
            name="rememberMe"
            type="checkbox"
            {...register('rememberMe')}
          />
        </div>
        <p style={{ color: 'white' }}>
          Need an Account?
          <br />
          <span>
            <Link to="/register">Sign Up</Link>
          </span>
        </p>

        <button type="submit">Submit</button>
      </Form>
    </Container>
  );
}
