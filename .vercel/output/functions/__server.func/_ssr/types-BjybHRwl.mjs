//#region node_modules/.nitro/vite/services/ssr/assets/types-BjybHRwl.js
function effectivePrice(product) {
	if (product.specialPrice != null && product.specialPrice > 0 && product.specialPrice < product.price) return product.specialPrice;
	return product.price;
}
var DEFAULT_SETTINGS = {
	siteName: "نازلی فینگر فود",
	tagline: "فینگر فود خونگی برای مهمونی‌های به‌یادماندنی",
	phone: "+989129564648",
	instagram: "fingerfood.nazli",
	aboutText: "نازلی فینگر فود با عشق و دقت، فینگر فود تازه و خونگی برای تولد، دورهمی و پذیرایی‌های شما آماده می‌کند. از مینی‌پیتزا و بورک تا پک‌های کامل مهمانی، همه چیز با مواد تازه و ظاهر مرتب سرو می‌شود.",
	orderClosed: false,
	orderClosedTitle: "ثبت سفارش موقتاً بسته است",
	orderClosedMessage: "ثبت سفارش از تاریخ {date} مجدداً فعال خواهد شد.",
	orderReopenDate: "",
	footerNote: "سفارش‌ها معمولاً از ۲۴ ساعت قبل هماهنگ می‌شوند."
};
//#endregion
export { effectivePrice as n, DEFAULT_SETTINGS as t };
