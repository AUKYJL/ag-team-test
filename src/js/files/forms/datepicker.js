/* Календар */

// Підключення функціоналу "Чертоги Фрілансера"
// Підключення списку активних модулів
import { flsModules } from "../modules.js";

// Підключення модуля
import datepicker from 'js-datepicker';

if (document.querySelector('[data-datepicker]')) {
	const picker = datepicker('[data-datepicker]', {
		customDays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
		customMonths: ["Янв", "Фев", "Мар","Апр","Май", "Июнь", "Июль", "Авг", "Сен", "Окт", "Ноя", "Дек"],
		overlayButton: 'Применить',
		overlayPlaceholder: 'Год (4 цифры)',
		startDay: 0,
		formatter: (input, date, instance) => {
			const value = date.toLocaleDateString()
			input.value = value
		},
		onSelect: function (input, instance, date) {

		}
	});
	flsModules.datepicker = picker;
}
