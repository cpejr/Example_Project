import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// import InputMask from 'react-input-mask';
import { z } from 'zod';
import { useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
    hasAdmin: z.boolean().optional().default(false),
    hasEditor: z.boolean().optional().default(false),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Password don't match",
  });

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(validationSchema),
  });
  const {
    mutate: createUser,
    error,
    isLoading,
  } = UseCreateUser({
    onSuccess: () =>
      navigate('/', { state: { from: location }, replace: true }),
  });

  const hasAdminPermission = useMemo(
    () => auth?.roles?.includes(ROLES_LIST.ADMIN),
    [auth]
  );

  const onSubmit = (data) => {
    const { hasAdmin, hasEditor, ...newUser } = data;
    const roles = [ROLES_LIST.USER];

    if (hasAdmin) roles.push(ROLES_LIST.ADMIN);
    if (hasEditor) roles.push(ROLES_LIST.EDITOR);

    createUser({ ...newUser, roles });
  };

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
          <>
            <div>
              <label htmlFor="hasAdmin">Give admin privileges</label>
              <input
                id="hasAdmin"
                name="hasAdmin"
                type="checkbox"
                {...register('hasAdmin')}
              />
            </div>

            <div>
              <label htmlFor="hasEditor">Give editor privileges</label>
              <input
                id="hasEditor"
                name="hasEditor"
                type="checkbox"
                {...register('hasEditor')}
              />
            </div>
          </>
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
