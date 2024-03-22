import Image from "next/image";
import { useEffect, useState } from "react";

interface PokemonItemProps {
	name: string;
}

function PokemonItem({ name }: PokemonItemProps) {
	const [pokemon, setPokemon] = useState<any | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		const getPokemon = async () => {
			setLoading(true);
			const res = await fetch(`/api/pokemons/${name}`);
			const data = await res.json();

			setPokemon(data);
			setLoading(false);
		};

		getPokemon();
	}, [name]);

	function renderAbilityPokemons() {
		if (!pokemon?.abilities) return null;

		return pokemon.abilities.map((ability: any, index: any) => (
			<p
				key={index}
				style={{
					color: "#ffff",
					textTransform: "uppercase",
				}}
			>
				{ability.ability.name}
			</p>
		));
	}

	return (
		<div className="rounded-lg p-2 flex justify-center flex-col items-center shadow-sm shadow-indigo-100 my-4">
			{loading ? (
				<svg
					fill="#FFFF"
					version="1.1"
					id="Capa_1"
					xmlns="http://www.w3.org/2000/svg"
					width="800px"
					height="800px"
					viewBox="0 0 26.349 26.35"
					className="animate-spin mr-3 ..."
					style={{ width: "100px", height: "100px" }}
				>
					<g>
						<g>
							<circle cx="13.792" cy="3.082" r="3.082" />
							<circle cx="13.792" cy="24.501" r="1.849" />
							<circle cx="6.219" cy="6.218" r="2.774" />
							<circle cx="21.365" cy="21.363" r="1.541" />
							<circle cx="3.082" cy="13.792" r="2.465" />
							<circle cx="24.501" cy="13.791" r="1.232" />
							<path
								d="M4.694,19.84c-0.843,0.843-0.843,2.207,0,3.05c0.842,0.843,2.208,0.843,3.05,0c0.843-0.843,0.843-2.207,0-3.05
						C6.902,18.996,5.537,18.988,4.694,19.84z"
							/>
							<circle cx="21.364" cy="6.218" r="0.924" />
						</g>
					</g>
				</svg>
			) : (
				<section>
					<div className="flex flex-col items-center">
						<Image
							alt=""
							width={220}
							height={220}
							src={pokemon?.sprites.other["official-artwork"].front_default}
						/>
					</div>

					<div className="mt-2 ">
						<div>
							<dd className="font-medium text-center text-2xl uppercase">
								{pokemon?.name}
							</dd>
						</div>

						<div className="mt-6 flex items-center gap-8 text-xs text-center flex justify-center">
							<div>{renderAbilityPokemons()}</div>
						</div>
					</div>
				</section>
			)}
		</div>
	);
}

export default PokemonItem;
