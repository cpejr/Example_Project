import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// import InputMask from 'react-input-mask';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { Container, Form } from './Styles';
import { cpfMask } from '../../utils/inputMasks';
import { UseCreateUser } from '../../hooks/query/userQuery';
import ROLES_LIST from '../../utils/rolesList';
import useAuthStore from '../../store/auth';

const validationSchema = z
  .object({
    fullName: z.string().min(1, 'Full name is required'),
    cpf: z.string().min(1, 'CPF is required'),
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email({
        message: 'Must be a valid email',
      })
      .trim(),
    password: z
      .string()
      .min(1, 'Password is required') // Provavelmente desnecessário
      .min(6, { message: 'Password must be atleast 6 characters' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Confirm Password is required' }),
    role: z
      .nativeEnum(ROLES_LIST, {
        errorMap: () => ({ message: 'Invalid permission code' }),
      })
      .default(ROLES_LIST.USER),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Password don't match",
  });

export default function Register() {
  const { auth } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(validationSchema),
  });
  const hasAdminPermission = auth?.role === ROLES_LIST.ADMIN;

  const { mutate: createUser, error, isLoading } = UseCreateUser();
  const onSubmit = (data) => createUser(data);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="fullName">First name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            {...register('fullName', { required: true })}
          />
          <p>{errors.fullName?.message}</p>
        </div>

        <div>
          <label htmlFor="cpf">CPF</label>
          {/* <Controller
            control={control}
            name="cpf"
            defaultValue=""
            render={({ field }) => (
              <InputMask mask="999.999.999-99" {...field} />
            )}
          /> */}
          <Controller
            control={control}
            name="cpf"
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                onChange={(e) => field.onChange(cpfMask(e.target.value))}
              />
            )}
          />
          <p>{errors.cpf?.message}</p>
        </div>

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
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            {...register('confirmPassword')}
          />
          <p>{errors.confirmPassword?.message}</p>
        </div>

        {hasAdminPermission ? (
          <div>
            <label htmlFor="role">Giver permission code</label>
            <input
              id="role"
              name="role"
              type="password"
              {...register('role', { valueAsNumber: true })}
            />
            <p>{errors.role?.message}</p>
          </div>
        ) : null}
        <p style={{ color: 'white' }}>
          Already registered?
          <br />
          <span className="line">
            <Link to="/login">Sign In</Link>
          </span>
        </p>
        <button type="submit">Submit</button>
      </Form>
    </Container>
  );
}
