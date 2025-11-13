"use client";

import React, { useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import {
    TextField,
    MenuItem,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Typography,
} from "@mui/material";

type FieldType = "TEXT" | "LIST" | "RADIO";

interface Field {
    id: number;
    name: string;
    fieldType: FieldType;
    required?: boolean;
    minLength?: number;      
    maxLength?: number;      
    defaultValue?: string;
    listOfValues1?: string[]; 
}

export default function DynamicForm({
    jsonData,
}: {
    jsonData: { data: Field[] };
}) {
    const defaultValues = useMemo(() => {
        const out: Record<string, any> = {};
        jsonData.data.forEach((f) => {
            out[f.name] = f.defaultValue || "";
        });
        return out;
    }, [jsonData]);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues,
    });

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    const rules = (f: Field) => {
        const r: any = {};
        if (f.required) r.required = `${f.name} is required`;
        if (f.minLength)
            r.minLength = {
                value: f.minLength,
                message: `Minimum ${f.minLength} characters`,
            };
        if (f.maxLength)
            r.maxLength = {
                value: f.maxLength,
                message: `Maximum ${f.maxLength} characters`,
            };
        if (f.name.toLowerCase().includes("email")) {
            r.pattern = {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email address",
            };
        }
        return r;
    };

    const onSubmit = (data: any) => {
        const existing = JSON.parse(localStorage.getItem("signup_data") || "[]");
        existing.push({ ...data, createdAt: new Date().toISOString() });
        localStorage.setItem("signup_data", JSON.stringify(existing));
        alert("Form submitted successfully!");
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
            {jsonData.data.map((field) => (
                <div key={field.id}>
                    <Controller
                        name={field.name}
                        control={control}
                        rules={rules(field)}
                        render={({ field: ctrl }) => {
                            let Component = <div />;

                            if (field.fieldType === "TEXT") {
                                Component = (
                                    <TextField
                                        label={field.name}
                                        {...ctrl}
                                        fullWidth
                                        error={!!errors[field.name]}
                                        helperText={errors[field.name]?.message as string}
                                    />
                                );
                            } else if (field.fieldType === "LIST") {
                                Component = (
                                    <TextField
                                        select
                                        label={field.name}
                                        {...ctrl}
                                        fullWidth
                                        error={!!errors[field.name]}
                                        helperText={errors[field.name]?.message as string}
                                    >
                                        {field.listOfValues1?.map((opt) => (
                                            <MenuItem key={opt} value={opt}>
                                                {opt}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                );
                            } else if (field.fieldType === "RADIO") {
                                Component = (
                                    <FormControl error={!!errors[field.name]}>
                                        <FormLabel>{field.name}</FormLabel>
                                        <RadioGroup
                                            row
                                            {...ctrl}
                                            onChange={(e) => ctrl.onChange(e.target.value)}
                                        >
                                            {field.listOfValues1?.map((opt) => (
                                                <FormControlLabel
                                                    key={opt}
                                                    value={opt}
                                                    control={<Radio />}
                                                    label={opt}
                                                />
                                            ))}
                                        </RadioGroup>

                                        {errors[field.name] && (
                                            <Typography variant="caption" color="error">
                                                {errors[field.name]?.message as string}
                                            </Typography>
                                        )}
                                    </FormControl>
                                );
                            }

                            return Component;
                        }}
                    />
                </div>
            ))}

            <button
                type="submit"
                className="bg-blue-600 text-white w-full py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
            >
                Submit
            </button>
        </form>
    );
}
