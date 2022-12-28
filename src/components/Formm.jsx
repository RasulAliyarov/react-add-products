import axios from 'axios';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import * as Yup from 'yup'
import "./Formm.css"
import Products from './Products';

const Formm = () => {
    const [products, setProducts] = useState([])
    const [categorise, setCategories] = useState([])

    // Prodcuts
    useEffect(() => {
        axios.get("https://northwind.vercel.app/api/products").then((resp) => {
            setProducts(resp.data)
        })
    }, [])

    // Categories
    useEffect(() => {
        axios.get("https://northwind.vercel.app/api/categories").then((resp) => {
            setCategories(resp.data)
        })
    }, [])

    const validationShema = Yup.object().shape({
        name: Yup.string().min(2, "dsdsa").max(50, "Избыток символов").required("Обязтельно к заполнеению!"),
        price: Yup.number().required("Обязтельно к заполнеению!"),
        stock: Yup.number().required("Обязтельно к заполнеению!"),
        contactName: Yup.string().max(50, "Избыток символов").required("Обязтельно к заполнеению!"),
        companyName: Yup.string().max(50, "Избыток символов").required("Обязтельно к заполнеению!"),
        categories: Yup.string().required("Обязтельно к заполнеению!"),
    })
    const formik = useFormik({
        initialValues: {
            name: "",
            price: "",
            stock: "",
            contactName: "",
            companyName: "",
            categories: "",
        },
        validateOnBlur: "",
        validationSchema: validationShema,
        onSubmit: (values) => {
            const { name, price, stock, contactName, companyName, categories } = values

            let newProduct = new Products(name, `${price}$`, stock, contactName, companyName, categories)
            axios.post("https://northwind.vercel.app/api/products", newProduct).then((resp) => {
                toast.success("Product is added")
            })
        }
    })
    return (
        <form onSubmit={formik.handleSubmit} className="form">
            <div className='formTitle'>
                <h1>Add products</h1>
                <a href="https://northwind.vercel.app/api/products"><i>Go to link for check...</i></a>
            </div>
            <div className='categoriesSelectDiv'>
                {formik.touched.categories && formik.errors.categories ? (<div className='errorMessage'>{formik.errors.categories}</div>) : null}
                <select name='categories' onChange={formik.handleChange} onBlur={formik.handleBlur}>
                    {
                        categorise.map(item => {
                            return (
                                <option value={item.name} key={item.id}>{item.name}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div className='fourInp'>
                <div>
                    <div>
                        {formik.touched.name && formik.errors.name ? (<div className='errorMessage'>{formik.errors.name}</div>) : null}
                        <input type="text" name="name" placeholder='Name' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    </div>
                    <div>
                        {formik.touched.price && formik.errors.price ? (<div className='errorMessage'>{formik.errors.price}</div>) : null}
                        <input type="number" name="price" placeholder='Price' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    </div>
                </div>
                <div>
                    <div>
                        {formik.touched.stock && formik.errors.stock ? (<div className='errorMessage'>{formik.errors.stock}</div>) : null}
                        <input type="number" name="stock" placeholder='In Stock' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    </div>
                    <div>
                        {formik.touched.contactName && formik.errors.contactName ? (<div className='errorMessage'>{formik.errors.contactName}</div>) : null}
                        <input type="text" name="contactName" placeholder='Contact Name' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    </div>
                </div>
                <div className='companyNameDiv'>
                    {formik.touched.companyName && formik.errors.companyName ? (<div className='errorMessage'>{formik.errors.companyName}</div>) : null}
                    <input type="text" name="companyName" placeholder='Company Name' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                </div>
            </div>
            <button type='submit' className='submitBtn'>Submit</button>
            <Toaster
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                    style: {
                        backgroundColor: 'rgb(179, 58, 209)',
                        color: 'white',
                        fontFamily: "sans-serif"
                    }
                }}
            />
        </form>
    )
}

export default Formm