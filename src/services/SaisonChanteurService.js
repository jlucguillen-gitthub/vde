// Responsabilités :

// récupérer les chanteurs d'une saison
// ajouter un chanteur à une saison
// supprimer l'association
/**
 * Son rôle :

porter la logique métier
ne jamais appeler Supabase directement
utiliser les repositories

On va avoir besoin de :

SaisonChanteurRepository
ChanteurRepository
 */
import { BaseService } from "./BaseService";
import { SaisonChanteurRepository } from "../repositories/SaisonChanteurRepository";
import { ChanteurRepository } from "../repositories/ChanteurRepository";
import { BaseResponse } from "../core/framework/BaseResponse";


export class SaisonChanteurService extends BaseService {

    constructor() {

        super(
            new SaisonChanteurRepository()
        );

        this.chanteurRepository = new ChanteurRepository();
    }
    async getAll() {

        const saisonId = this.context.saisonId;

        return this.repository.findBySaison(saisonId);

    }

    /**
     * Liste les chanteurs d'une saison
     */
    async getBySaison(saisonId) {

        const { data, error } =
            await this.repository.findBySaison(saisonId);


        if (error) {
            return BaseResponse.error([], error.message);
        }


        return BaseResponse.success(
            data.map(item => ({
                id: item.id,
                chanteur_id: item.chanteur_id,
                saison_id: item.saison_id,
                chanteur: item.chanteurs
            }))
        );
    }



    /**
     * Liste des chanteurs pouvant être ajoutés
     */
    async getAvailableChanteurs(saisonId) {


        // 1 - tous les chanteurs actifs
        const {
            data: chanteurs,
            error: errorChanteurs
        } = await this.chanteurRepository.findAll();


        if (errorChanteurs) {
            return BaseResponse.error([], errorChanteurs.message);
        }


        // 2 - chanteurs déjà dans la saison
        const {
            data: existants,
            error: errorExistants
        } = await this.repository.findBySaison(saisonId);


        if (errorExistants) {
            return BaseResponse.error([], errorExistants.message);
        }


        const idsExistants = existants.map(
            item => item.chanteur_id
        );


        // 3 - différence
        const disponibles = chanteurs.filter(
            chanteur =>
                !idsExistants.includes(chanteur.id)
        );


        return BaseResponse.success(disponibles);
    }


    async save(data) {


        return this.addChanteur(
            data.chanteur_id
        );
    }
    /**
     * Ajout d'un chanteur dans une saison
     */
    async addChanteur(chanteurId) {
        const saisonId = this.context.saisonId;

        console.log(saisonId, chanteurId)
        const { data: exists } =
            await this.repository.exists(
                saisonId,
                chanteurId
            );


        if (exists) {
            return BaseResponse.error(
                [],
                "Ce chanteur est déjà associé à cette saison"
            );
        }


        const { data, error } =
            await this.repository.insert({
                saison_id: saisonId,
                chanteur_id: chanteurId
            });


        if (error) {
            return BaseResponse.error([], error.message);
        }


        return BaseResponse.success(data);
    }



    /**
     * Retrait d'un chanteur d'une saison
     */
    async removeChanteur(id) {

        const { error } =
            await this.repository.remove(id);


        if (error) {
            return BaseResponse.error([], error.message);
        }


        return BaseResponse.success(null);
    }

}