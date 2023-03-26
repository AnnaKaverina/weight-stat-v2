import React, { ChangeEventHandler, useEffect, useState } from 'react';
import { useSearchMutation } from '../../services/food-service';
import { useAddStatMutation } from '../../services/stat-service';
import { FormikValues, useFormik } from 'formik';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import { IFoodItem, IFoodNutrient } from '../../interfaces/food-data.interface';
import { FieldsWrapper } from './add-stat-page.style';
import { IUserDataItem } from '../../interfaces/user-data.interface';
import getTitleLocaleDate from '../../helpers/getTitleLocaleDate';
import { Autocomplete, TextField, Button } from '@mui/material';

const CustomTextField = ({ name, label, value, handleChange }: {
	name: string,
	label: string,
	value: number,
	handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> }) => (
	<TextField
		id={name}
		name={name}
		label={label}
		value={value}
		sx={{ width: 300 }}
		margin="normal"
		onChange={handleChange}
	/>
);

function AddStatPage() {
	// todo add error handling
	const [addStat] = useAddStatMutation();
	const sendStat = (values: FormikValues) => {
		const stat: IUserDataItem = {
			date: getTitleLocaleDate(new Date()),
			values: [
				{
					title: 'Calories',
					value: values['calories'],
					maxValue: 1500,
				},
				{
					title: 'Fats',
					value: values['fats'],
					maxValue: 1500,
				},
				{
					title: 'Proteins',
					value: values['proteins'],
					maxValue: 1500,
				},
				{
					title: 'Carbohydrates',
					value: values['carbohydrates'],
					maxValue: 1500,
				},
			]
		};
		addStat(stat);
	};

	const formik = useFormik({
		initialValues: {
			searchField: '',
			product: '',
			calories: 0,
			fats: 0,
			proteins: 0,
			carbohydrates: 0,
			productWeight: 0
		},
		onSubmit: (values) => {
			sendStat(values);
		},
	});

	const [searchFood, { data }] = useSearchMutation();
	const [currentSearchResult, setCurrentSearchResult] = useState<IFoodItem | null>(null);

	const debouncedSearchField = useDebouncedValue(formik.values.searchField);

	const setSearchResult = (id: IFoodItem['fdcId']) => {
		setCurrentSearchResult(data?.foods.find((item) => item.fdcId === id) || null);
	};

	useEffect(() => {
		if (debouncedSearchField) {
			searchFood({ query: debouncedSearchField });
		}
	}, [debouncedSearchField]);

	const getNutrientValue = (nutrientName: string, nutrientsArray: Array<IFoodNutrient>, weight: number): number => {
		const nutrientValue = nutrientsArray
			?.find((item) => item.nutrientName === nutrientName)?.value || 0;
		return nutrientValue * weight / 100;
	};

	useEffect(() => {
		if (currentSearchResult) {
			formik.setFieldValue('calories', getNutrientValue('Energy', currentSearchResult.foodNutrients, formik.values.productWeight));
			formik.setFieldValue('fats', getNutrientValue('Total lipid (fat)', currentSearchResult.foodNutrients, formik.values.productWeight));
			formik.setFieldValue('proteins', getNutrientValue('Protein', currentSearchResult.foodNutrients, formik.values.productWeight));
			formik.setFieldValue('carbohydrates', getNutrientValue('Carbohydrates', currentSearchResult.foodNutrients, formik.values.productWeight));
		}
	}, [JSON.stringify(currentSearchResult), formik.values.productWeight]);

	return (
		<>
			<h1>Add stat</h1>
			<form onSubmit={formik.handleSubmit}>
				<FieldsWrapper>
					<Autocomplete
						disablePortal
						id="autocomplete-search"
						options={data?.foods.map((item) => ({ label: item.description, id: item.fdcId })) || []}
						sx={{ width: 300, marginBottom: '8px' }}
						isOptionEqualToValue={(option, value) => option.id === value.id}
						onChange={(event, value) => value && setSearchResult(value.id)}
						renderInput={(params) => (
							<TextField
								{...params}
								name="searchField"
								label="Product search"
								onChange={formik.handleChange}
							/>)}
					/>
					<CustomTextField
						name="productWeight"
						label="Product weight, gram"
						value={formik.values.productWeight}
						handleChange={formik.handleChange}
					/>
					<CustomTextField
						name="calories"
						label="Calories"
						value={formik.values.calories}
						handleChange={formik.handleChange}
					/>
					<CustomTextField
						name="fats"
						label="Fats"
						value={formik.values.fats}
						handleChange={formik.handleChange}
					/>
					<CustomTextField
						name="proteins"
						label="Proteins"
						value={formik.values.proteins}
						handleChange={formik.handleChange}
					/>
					<CustomTextField
						name="carbohydrates"
						label="Carbohydrates"
						value={formik.values.carbohydrates}
						handleChange={formik.handleChange}
					/>
					<Button
						type="submit"
						variant="contained"
						size="large"
					>
						Send
					</Button>
				</FieldsWrapper>
			</form>
		</>
	);
}

export default AddStatPage;
