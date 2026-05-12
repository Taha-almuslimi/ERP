import { Logo } from './Logo';
import { Title } from './Title';
import { Form } from './Form/Form';


export function FormSection({ data, setData, handleSubmit, errors}) {
  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-white">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Logo />
          <Title />
        </div>
        <Form data={data} setData={setData} handleSubmit={handleSubmit} errors={errors}/>
      </div>
    </div>
  );
}
