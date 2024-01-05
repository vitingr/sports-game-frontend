"use client";

import React, { useState } from "react";
import Popup from "../config/Popup";
import ToastMessage from "../config/ToastMessage";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { CREATE_LINEUP } from "@/graphql/mutations";
import { infoUser } from "@/contexts/UserContext";

const CreateLineup = ({
	showState,
	handleRefetchData,
}: {
	showState: any;
	handleRefetchData: any;
}) => {
	const { user } = infoUser();

	const [lineupName, setLineupName] = useState<string>("");
	const [createLineup] = useMutation(CREATE_LINEUP);

	const handleCreateLineup = async () => {
		try {
			if (lineupName !== "") {
				await createLineup({
					variables: {
						name: lineupName,
						owner: user.id as string,
					},
				});
				await handleRefetchData();
				toast.success("Lineup Criada com Sucesso!");
				showState(false);
			}
		} catch (error) {
			toast.error("Não foi possível criar uma nova lineup");
		}
	};

	return (
		<Popup
			title="Adicionar Lineup"
			description="Você pode adicionar quantas formações você quiser ao seu clube. Em cada lineup você escolhe 11 jogadores do seu elenco, e quando for desafiar outra pessoa, você pode escolhar sua formação preferida para utilizar."
			state={showState}
		>
			<ToastMessage />
			<form
				onSubmit={async (e: React.SyntheticEvent) => {
					e.preventDefault();
					await handleCreateLineup();
				}}
				className="w-full pt-8"
			>
				<label htmlFor="lineupName" className="text-lg">
					Nome da Lineup
				</label>
				<input
					type="text"
					name="lineupName"
					id="lineupName"
					className="w-full px-4 py-3 border border-neutral-300 rounded-lg outline-none transition-all duration-300 focus:border-indigo-600"
					placeholder="Digite o novo nome desejado para a sua formação"
					onChange={(e) => setLineupName(e.target.value)}
					autoComplete="off"
				/>

				<button
					className="w-full mt-16 bg-indigo-600 text-white py-3 rounded-full"
					type="submit"
				>
					Adicionar nova Lineup
				</button>
			</form>
		</Popup>
	);
};

export default CreateLineup;
