import { Formik, Form, Field, ErrorMessage, useField} from 'formik';
import * as Yup from 'yup';

const MyTextInput = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            <input {...props} {...field}/>
            {meta.touched && meta.error ? (
                <div className='error'>{meta.error}</div>
            ) : null}
        </>
    )
};

const MyCheckBox = ({children, ...props}) => {
    const [field, meta] = useField({...props, type: 'checkbox'});
    return (
        <>
            <label className="checkbox">
                <input type="checkbox" {...props} {...field}/>
                {children}
            </label>
            {meta.touched && meta.error ? (
                <div className='error'>{meta.error}</div>
            ) : null}
            
        </>
    )
};

const CustomForm = () => {
    return (
        <Formik 
            initialValues = {{
                name: '',
                email: '',
                amount: 0,
                currency: '',
                text: '',
                terms: false
            }}
            validationSchema = {Yup.object ({
                name: Yup.string()
                    .min(2, 'Minimum 2 symbols')
                    .required('Required'),
                email: Yup.string()
                    .email('Wrong email adress')
                    .required('Required'),
                amount: Yup.number()
                    .min(5, 'Need more then 5 symbols')
                    .required('Required'),
                currency: Yup.string().required('Choose your currency'),
                text: Yup.string()
                    .min(10, 'Need more then 10 symbols'),
                terms: Yup.boolean()
                    .required('Need your agreement')
                    .oneOf([true], 'Need your agreement')
            })}
            onSubmit={values => console.log(JSON.stringify(values, null, 2))}
            >
            <Form className="form">
                <h2>Отправить пожертвование</h2>
                <MyTextInput
                    label="Ваше имя"
                    id="name"
                    name="name"
                    type="text"
                    />
                <MyTextInput
                    label="Ваша почта"
                    id="email"
                    name="email"
                    type="email"
                    />

                <MyTextInput
                    label="Количество"
                    id="amount"
                    name="amount"
                    type="number"
                    />
                <label htmlFor="currency">Валюта</label>
                <Field
                    id="currency"
                    name="currency"
                    as="select">
                        <option value="">Выберите валюту</option>
                        <option value="USD">USD</option>
                        <option value="UAH">UAH</option>
                        <option value="RUB">RUB</option>
                </Field>
                <ErrorMessage className='error' name='currency' component='div'/>
                <label htmlFor="text">Ваше сообщение</label>
                <Field 
                    id="text"
                    name="text"
                    as="textarea"
                />
                <ErrorMessage className='error' name='text' component='div'/>
                <MyCheckBox
                    name='terms'
                > 
                 Соглашаетесь с политикой конфиденциальности?
                </MyCheckBox>
                <button type="submit">Отправить</button>
            </Form>
        </Formik>
    )
}

export default CustomForm;