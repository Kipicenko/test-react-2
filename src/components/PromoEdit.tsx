import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from "react-hook-form";
import CustomSelect from "./СustomSelect";

type FormData = {
    sum: number,
    condition: string,
    code: string,
};

const schema = yup.object({
    code: yup.string().max(20, "Слишком большое название промокода (максимум 20 символов)").required("Обязательное поле!"),
    sum: yup.number().typeError("Должно быть число").max(1000, "Максимум 1000").min(0, "Минимум 0").required("Обязательное поле!")
}).required();

function PromoEdit() {
    const { id } = useParams()
    const navigate = useNavigate()
    const {control, reset, register, handleSubmit, formState: { errors }} = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            sum: 0,
            condition: "",
            code: "",
        }
    })

    useEffect(() => {
        const getPromo = async (): Promise<void> => {
            try {
                let { data } = await axios.get(`https://62822e86ed9edf7bd87fee81.mockapi.io/promo/${id}`)
                reset({
                    sum: data.sum,
                    condition: data.condition,
                    code: data.code
                })
            } catch (error) {
                alert("Ошибка получения промокода, попробуйте еще раз")
                console.error(error)
            }
        }

        getPromo()
    }, [])

    const onSubmit = async (data: FormData): Promise<void> => {
        try {
            await axios.put(`https://62822e86ed9edf7bd87fee81.mockapi.io/promo/${id}`, data)
            navigate(-1)
        } catch (error) {
            alert("Произошла ошибка при изменении, попробуйте еще раз")
            console.error(error)
        }
    }

    return (
        <div className="promo-edit">
            <h1 className="promo-edit__title">Редактирование промокода</h1>
            <Link className="promo-edit__link" to="/promo">Вернуться назад</Link>
            <form onSubmit={handleSubmit(onSubmit)} className="promo-edit__form">
                <div className="container-input">
                    <label htmlFor="code">Промокод</label>
                    <input {...register("code")}
                           style={errors.code && {border: "2px solid #F21400"}}
                           placeholder="Введите название промокода"
                           type="text"
                           id="code"
                    />
                    {errors.code && (
                        <p className="container-input-p__error">{errors.code.message}</p>
                    )}
                </div>
                <div className="container-input">
                    <label htmlFor="sum">Сумма</label>
                    <input {...register("sum")}
                           style={errors.sum && {border: "2px solid #F21400"}}
                           placeholder="Введите сумму"
                           type="text"
                           id="sum"
                    />
                    {errors.sum && (
                        <p className="container-input-p__error">{errors.sum.message}</p>
                    )}
                </div>
                <div className="container-input container-input-flex">
                    <label htmlFor="condition">Состояние :</label>
                    <Controller
                        control={control}
                        name="condition"
                        render={({field: {value, onChange}}) => (
                            <CustomSelect
                                options={[
                                    {
                                        value: "Новый",
                                        label: "Новый"
                                    },
                                    {
                                        value: "Использованный",
                                        label: "Использованный"
                                    },
                                ]}
                                value={value}
                                onChange={onChange}
                                className="custom-width-select"
                            />
                        )}
                    />
                </div>
                <button type="submit" className="promo-edit__btn">Сохранить</button>
            </form>
        </div>
    );
}

export default PromoEdit;