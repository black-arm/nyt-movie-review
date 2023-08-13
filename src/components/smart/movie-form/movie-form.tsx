import Button from "@/components/dumb/button/Button";
import Input from "@/components/dumb/input/Input";
import { MovieFormProps, MovieQuery } from "@/model";
import { ChangeEvent, FormEvent, useState } from "react";
import style from './movie-form.module.css';

export default function MovieForm({movieFormSubmit}: MovieFormProps){
    
    const [form, setForm] = useState<MovieQuery>({
        query: '',
        reviewer: '',
        startDate: null,
        endDate: null
    })

    const [isQueryNotEmpty, setIsQueryNotEmpty] = useState<boolean>(false)
    const [isStartDateGreaterThanEndDate, setStartDateGreaterThanEndDate] = useState<boolean>(false)

    const formValid = !isQueryNotEmpty && !isStartDateGreaterThanEndDate;

    function queryOnChange(e: ChangeEvent<HTMLInputElement>){
        setForm({
            ...form,
            query: e.target.value
        })
    }

    function reviewerOnChange(e: ChangeEvent<HTMLInputElement>) {
        setForm({
            ...form, 
            reviewer: e.target.value
        })
    }

    function startDateOnChange(e: ChangeEvent<HTMLInputElement>) {
        setForm({
            ...form,
            startDate: e.target.valueAsDate
        })
    }

    function endDateOnChange(e: ChangeEvent<HTMLInputElement>){
        setForm({
            ...form,
            endDate: e.target.valueAsDate
        })
    }

    function submit(e: FormEvent){
        
        e.preventDefault();
        checkIfQueryIsValid();

        if(formValid && movieFormSubmit){
            movieFormSubmit(form);
        }
    }

    function checkIfQueryIsValid(){
        if(!form.query || form.query === ''){
            setIsQueryNotEmpty(true)
        }

        if((form.startDate && form.endDate) && form.startDate.getTime() > form.endDate.getTime()){
            setStartDateGreaterThanEndDate(true)
        }
    }

    return <form onSubmit={submit}>
            <div data-testid="movieForm" className={style.movieForm}>
                <Input label="Movie" inputTestId="query" inputChange={queryOnChange} 
                    isInvalid={isQueryNotEmpty}>Insert Movie</Input>
                <Input label="Reviewer" inputTestId="reviewer" inputChange={reviewerOnChange} />
                <Input label="Start Date" 
                    inputTestId="startDate" 
                    isInvalid={isStartDateGreaterThanEndDate}
                    type="date" inputChange={startDateOnChange}>Start Date greater than End Date</Input>
                <Input label="End Date" 
                    inputTestId="endDate" 
                    type="date" 
                    isInvalid={isStartDateGreaterThanEndDate}
                    inputChange={endDateOnChange} >End Date smaller than Start Date</Input>
            </div>
             <div data-testid='buttonsBox' className={style.buttons}>
                <div data-testid='searchButtonBox' className={style.buttonItem}>
                    <Button buttonTestId="search" type="submit">Search</Button>
                </div>
                <div data-testid='resetButtonBox' className={style.buttonItem}>
                    <Button buttonTestId="reset" type="reset">Clean</Button>
                </div>
             </div>
        </form>
}