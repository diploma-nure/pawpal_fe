sprites:
	npm run process:svg && npx svg-symbol-sprite -i ./src/assets/icons/svgs -o ./src/assets/icons/sprite.svg -a "xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' width='24' height='24'"
run-frontend:
	npm run dev
init:
	npm i
