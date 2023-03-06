import React, { useEffect } from 'react';
import { useSearchMutation } from '../../services/food-service';
import { Formik, Form, Field, useFormikContext } from 'formik';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import { IFoodSearchResult } from '../../interfaces/food-data.interface';
import { FieldsWrapper } from './add-stat-page.style';

const OptionList = ({ searchResult }: { searchResult: IFoodSearchResult | undefined }) => {
	if (!searchResult || !searchResult.foods.length) return null;
	return (
		<>
			{searchResult.foods
				.map((item, id) => <option key={id} value={item.fdcId}>{item.description}</option>)}
		</>
	);
};

const SearchProductFields = () => {
	const { values: {
		selectedProductId, searchField, productWeight
	}, setFieldValue } = useFormikContext<{ searchField: string, selectedProductId: number, productWeight: number }>();
	const searchValue = useDebouncedValue(searchField);
	const [search, { data }] = useSearchMutation();

	useEffect(() => {
		if (searchValue) {
			search({ query: searchValue });
		}
	}, [searchValue]);

	useEffect(() => {
		if (selectedProductId) {
			const productById = data?.foods.find((item) => item.fdcId === Number(selectedProductId));
			const caloriesValue = productById?.foodNutrients
				.find((item) => item.nutrientName.toLowerCase().includes('energy'))?.value || 0;
			const proteinsValue = productById?.foodNutrients
				.find((item) => item.nutrientName.toLowerCase().includes('protein'))?.value || 0;
			const fatsValue = productById?.foodNutrients
				.find((item) => item.nutrientName.toLowerCase().includes('fat'))?.value || 0;
			const carbohydratesValue = productById?.foodNutrients
				.find((item) => item.nutrientName.toLowerCase().includes('carbohydrate'))?.value || 0;
			setFieldValue('calories', caloriesValue / 100 * productWeight);
			setFieldValue('proteins', proteinsValue / 100 * productWeight);
			setFieldValue('fats', fatsValue / 100 * productWeight);
			setFieldValue('carbohydrates', carbohydratesValue / 100 * productWeight);
		}
	}, [selectedProductId, productWeight]);

	return (
		<FieldsWrapper>
			<label htmlFor="searchField">Product</label>
			<Field type="text" name="searchField" />
			<Field as="select" name="selectedProductId">
				<OptionList searchResult={data} />
			</Field>
			<label htmlFor="calories">Calories</label>
			<Field type="text" name="calories" />
			<label htmlFor="fats">Fats</label>
			<Field type="text" name="fats" />
			<label htmlFor="proteins">Proteins</label>
			<Field type="text" name="proteins" />
			<label htmlFor="carbohydrates">Carbohydrates</label>
			<Field type="text" name="carbohydrates" />
			<label htmlFor="productWeight">Product weight, gram</label>
			<Field type="text" name="productWeight" />
			<button type="submit">Send</button>
		</FieldsWrapper>
	);
};

function AddStatPage() {
	return (
		<>
			<h1>Add stat</h1>
			<Formik
				initialValues={{
					product: '',
					calories: 0,
					fats: 0,
					proteins: 0,
					carbohydrates: 0
				}}
				onSubmit={(values) => {console.log('___', values);}}
			>
				<Form>
					<SearchProductFields />
				</Form>
			</Formik>
		</>
	);
}

export default AddStatPage;
