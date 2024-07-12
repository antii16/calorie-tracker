import { categories } from "../data/categories"
import { useState,ChangeEvent, FormEvent, Dispatch } from "react"
import { Activity } from "../types"
import { ActivityActions } from "../reducers/activity-reducer"

type FormProps = {
    dispatch: Dispatch<ActivityActions>
}
export default function Form({dispatch}: FormProps) {

    // Inicializa el state con un arreglo
    const [activity, setActivity] = useState<Activity>({
        category: 1,
        name:'',
        calories: 0
    })

    // Permitir que cambie el state con onChange
    // ...activity --> mantiene lo que había en el state
    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>)=> {
        // comprobar si es category o calories
        const isNumberField = ['category', 'calories'].includes(e.target.id)
        setActivity({ 
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    }

    // Validar formulario
    const isValidActivity = () => {
        const { name, calories } = activity
        return name.trim() !== '' && calories > 0
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({type: 'save-activity', payload: {newActivity: activity}})
    }

    return (
        <form
            className="space-y-5 bg-white shadow p-10 rounded-10"
            onSubmit={handleSubmit}
            >
            
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category" className="font-bold">Categoría: </label>
                <select
                    id="category"
                    className="border  border-slate-300 p-2 rounded-lg w-full bg-white"
                    value={activity.category}
                    onChange={handleChange}
                    >
                    {categories.map(category => (
                        <option
                            key={category.id}
                            value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name" className="font-bold">Actividad: </label>
                <input
                    id="name"
                    type="text"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Ej. Comida, Jugo de Naranja, Ejercicio, Ensalada, Pesas, Bicicleta"
                    value={activity.name}
                    onChange={handleChange}
                />
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories" className="font-bold">Calorías: </label>
                <input
                    id="calories"
                    type="number"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Calorias, ej. 300 o 500"
                    value={activity.calories}
                    onChange={handleChange}
                />
            </div>

            <input type="submit"
                className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
                value={`Guardar ${activity.category === 1 ? 'Comida' : 'Ejercicio'}`}
                disabled={!isValidActivity()}
                />
        </form>
    )
}
