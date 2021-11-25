import {useFormik} from 'formik';
import * as Yup from 'yup';

const Form = () => {
    const formik = useFormik ({
        initialValues: {
            name: '',
            email: '',
            amount: 0,
            currency: '',
            text: '',
            terms: false
        },
        validationSchema: Yup.object ({
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
        }),
        onSubmit: values => console.log(JSON.stringify(values, null, 2))
    })

    return (
        <form className="form" onSubmit={formik.handleSubmit}>
            <h2>Отправить пожертвование</h2>
            <label htmlFor="name">Ваше имя</label>
            <input
                id="name"
                name="name"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.error.name && formik.touched.name ? <div className='error'>{formik.error.name}</div> : null}
            <label htmlFor="email">Ваша почта</label>
            <input
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.error.email && formik.touched.email ? <div className='error'>{formik.error.email}</div> : null}
            <label htmlFor="amount">Количество</label>
            <input
                id="amount"
                name="amount"
                type="number"
                value={formik.values.amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.error.amount && formik.touched.amount ? <div className='error'>{formik.error.amount}</div> : null}
            <label htmlFor="currency">Валюта</label>
            <select
                id="currency"
                name="currency"
                value={formik.values.currency}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}>
                    <option value="">Выберите валюту</option>
                    <option value="USD">USD</option>
                    <option value="UAH">UAH</option>
                    <option value="RUB">RUB</option>
            </select>
            {formik.error.currency && formik.touched.currency ? <div className='error'>{formik.error.currency}</div> : null}
            <label htmlFor="text">Ваше сообщение</label>
            <textarea 
                id="text"
                name="text"
                value={formik.values.text}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}

            />
            {formik.error.text && formik.touched.text ? <div className='error'>{formik.error.text}</div> : null}
            <label className="checkbox">
                <input 
                    name="terms" 
                    type="checkbox"
                    value={formik.values.terms}
                    onChange={formik.handleChange}
                    />
                Соглашаетесь с политикой конфиденциальности?
            </label>
            {formik.error.terms && formik.touched.terms ? <div className='error'>{formik.error.terms}</div> : null}
            <button type="submit">Отправить</button>
        </form>
        
        
        
    )
}

export default Form;