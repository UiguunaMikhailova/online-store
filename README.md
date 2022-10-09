# online-store

Интернет-магазин по тематике кофе. Товары имеют следующий функционал: фильтрация, сортировка, поиск, добавление в корзину.

Требования были следующие:

1) Главная страница содержит все товары магазина а также фильтры, строку поиска, поле для сортировки.
2) Карточка товара содержит его изображение, название, количество данного товара на складе, год выхода на рынок, цвет, производитель и т.д., находится ли товар в корзине (или любые другие показатели)
3) Карточки товаров добавляются динамически средствами JavaScript
4) Кликая по карточке с товаром или по кнопке на нем, товар можно добавлять в корзину или удалять. Карточки добавленных в корзину товаров внешне отличаются от остальных
5) На странице отображается количество добавленных в корзину товаров. При попытке добавить в корзину больше 20 товаров, выводится всплывающее уведомление с текстом "Извините, все слоты заполнены"
6) Сортируются только те товары, которые в данный момент отображаются на странице (по цене в возрастающем и убывающем порядке, по количеству на складе в возрастающем и убывающем порядке)
7) Фильтры в указанном диапазоне от и до (по цене, по количеству на складе)
8) Для фильтрации в указанном диапазоне используется range slider с двумя ползунками. При перемещении ползунков отображается их текущее значение, разный цвет слайдера до и после ползунка
9) Фильтры по типу, вкусу и стране, можно отобразить только популярные товары
10) Можно отфильтровать товары по нескольким фильтрам одного типа или разного типа
11) Для нескольких фильтров разного типа отображаются только те товары, которые соответствуют всем выбранным фильтрам.
12) Если товаров, соответствующих всем выбранным фильтрам нет, на странице выводится уведомление, например, "Извините, совпадений не обнаружено"
13) Сброс фильтров (есть кнопка reset для сброса фильтров)
14) Сохранение настроек в local storage (выбранные пользователем фильтры, порядок сортировки, добавленные в избранное товары сохраняются при перезагрузке страницы. Есть кнопка сброса настроек, которая очищает local storage)
15) Поиск (при вводе поискового запроса на странице остаются только те товары, в которых есть указанные в поиске буквы в указанном порядке. При этом не обязательно, чтобы буквы были в начале слова. Регистр символов при поиске не учитывается
Поиск ведётся только среди товаров, которые в данный момент отображаются на странице.
если очистить поле поиска, на странице отображаются товары, соответствующие всем выбранным фильтрам и настройкам сортировки)

### Deploy: https://bucolic-beignet-96b93e.netlify.app/
