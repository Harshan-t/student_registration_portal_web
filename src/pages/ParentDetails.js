// Form-2
import InputField from '../Components/InputField'
import DropDown from '../Components/DropDown';
import Form from '../Components/Form';
import { useNavigate } from 'react-router-dom';
import services from "../services/services";

import { useForm } from "react-hook-form";
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Row from "../Components/Row";

function ParentDetails() {
    const navigate = useNavigate();
    const applicationNo = useSelector((state) => state.applicationNo.value)

    const [formData, setFormData] = useState({
        father_name: '',
        mother_name: '',
        guardian_name: '',
        occupation: '',
        parent_income: '',
        work_area: '',
        designation: '',
        occupation_mother: '',
        parent_income_mother: '',
        work_area_mother: '',
        designation_mother: '',
    })
    const [options, setOptions] = useState({
        'occupation': {},
        'designation': {},
    })

    const { register, handleSubmit, reset } = useForm({ defaultValues: formData });

    useEffect(() => {
        const getDefaultValues = async () => {
            const queryParams = Object.keys(formData).join(',')
            const fetchedData = await services.fetchData(applicationNo, queryParams)
            setFormData(fetchedData)
            reset(fetchedData)
        }

        const getOptions = async () => {
            const optionsArray = Object.keys(options);
            const fetchedOptions = await Promise.all(
                optionsArray.map((option) => services.fetchFromMaster(option))
            );

            const newOptions = {};
            optionsArray.forEach((option, index) => {
                newOptions[option] = fetchedOptions[index];
            });

            setOptions(newOptions);
        };

        const init = async () => {
            await getOptions();
            await getDefaultValues();
        };

        init();
    }, [])


    const onSubmit = async (data) => {
        services.updateData(applicationNo, data)
        navigate('/address_details')
    }

    return (
        <div>
            <Form handleNext={handleSubmit(onSubmit)} heading="Parent Details" handleBack={() => { navigate('/personal_details') }}>
                <Row>
                    <InputField
                        label="Father's Name"
                        registerProps={register("father_name")}
                        type="text"
                    />
                    <DropDown
                        label="Father's Occupation"
                        options={options['occupation']}
                        registerProps={register("occupation")}
                    />
                    <InputField
                        label="Father's Income"
                        registerProps={register("parent_income")}
                        type="number"
                    />
                </Row>

                <Row>
                    <InputField
                        label="Organisation/Company"
                        registerProps={register("work_area")}
                        type="text"
                    />
                    <DropDown
                        label="Designation"
                        options={options['designation']}
                        registerProps={register("designation")}
                    />
                </Row>
                <Row>

                    <InputField
                        label="Mother's Name"
                        registerProps={register("mother_name")}
                        type="text"
                    />

                    <DropDown
                        label="Mother's Occupation"
                        options={options['occupation']}
                        registerProps={register("occupation_mother")}
                    />

                    <InputField
                        label="Mother's Income"
                        registerProps={register("parent_income_mother")}
                        type="number"
                    />
                </Row>

                <Row>
                    <InputField
                        label="Organisation/Company"
                        registerProps={register("work_area_mother")}
                        type="text"
                    />
                    <DropDown
                        label="Designation"
                        options={options['designation']}
                        registerProps={register("designation_mother")}
                    />

                </Row>

                <Row>
                    <InputField
                        label="Guardian Name"
                        registerProps={register("guardian_name")}
                        type="text"
                    />
                </Row>

            </Form>
        </div>
    )
}

export default ParentDetails