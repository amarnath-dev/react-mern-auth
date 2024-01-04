import * as Yup from "yup"

export const registerSchem = Yup.object({
    name: Yup.string().min(2).max(25).required("Please enter your name"),
    email: Yup.string().email().required("Please enter your email"),
    phone: Yup.number().required("Please enter your number"),
    password: Yup.string().required("Please enter a password"),
})