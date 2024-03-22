import { useEffect, useState } from "react";
import PokemonItem from "@/components/pokemonItem";

export default function Home() {
	const [page, setPage] = useState<number>(1);
	const [data, setData] = useState<any>(null);

	useEffect(() => {
		const getPokemons = async () => {
			const offset = page > 1 ? page * 8 : 0;
			const response = await fetch(`/api/pokemons?offset=${offset}&limit=8`);
			const data = await response.json();

			console.log(data);
			setData(data);
		};

		getPokemons();
	}, [page]);

	function changePage(next: boolean) {
		if (next) {
			setPage(page + 1);
		} else {
			if (page > 1) {
				setPage(page - 1);
			}
		}
	}

	return (
		<div>
			<h1 className="text-5xl flex justify-center">POKEMONS</h1>
			<div className="flex w-96 justify-center gap-3 mx-auto">
				<button
					className="mt-6 border p-2 rounded-2xl"
					onClick={() => changePage(false)}
				>
					Back page
				</button>
				<button
					className="mt-6 border p-2 rounded-2xl"
					onClick={() => changePage(true)}
				>
					Next page
				</button>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
				{data?.results.map((pokemon: any) => (
					<PokemonItem key={pokemon.name} name={pokemon.name} />
				))}
			</div>
		</div>
	);
}
