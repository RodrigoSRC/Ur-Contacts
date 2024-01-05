import { hash } from "bcryptjs";
import { AppDataSource } from "../data-source";
import { Client } from "../entities/clients.entity"
import { TClientRequest, TClientResponse, TClientUpdateRequest } from "../interfaces/client.interfaces";
import { clientSchemaResponse, clientsSchemaResponse, clientSchema } from "../schemas/clients.schemas";
import { AppError } from "../errors/AppError";


export class ClientService {
    async create(data: TClientRequest): Promise<TClientResponse> {
        const { email, name, password, telephone } = data
        const clientRepository = AppDataSource.getRepository(Client)
        const findClient = await clientRepository.findOne({
            where: {
                email
            }
        })
    
        if (findClient) {
            throw new AppError("Client already exists", 409)
        }
    
        const hashedPassword = await hash(password, 10)
    
        const client = clientRepository.create({
            name,
            email,
            password: hashedPassword,
            telephone
        })
    
        await clientRepository.save(client)
    
        return clientSchemaResponse.parse(client)
    }

    async list() {
        const clientRepository = AppDataSource.getRepository(Client)
        const clients = await clientRepository.find()
    
        return clientsSchemaResponse.parse(clients)
    }

    async update(data: TClientUpdateRequest, clientId: string): Promise<TClientResponse> {
        const clientRepository = AppDataSource.getRepository(Client)
        const oldClient = await clientRepository.findOneBy({ id: clientId })

        if (!oldClient) {
            throw new AppError("User not found", 404)
        }

        const newClientData = clientRepository.create({
            ...oldClient,
            ...data
        })

        await clientRepository.save(newClientData)



        return clientSchemaResponse.parse(newClientData)
    }

    // async update(data: TClientUpdateRequest, clientId: string): Promise<TClientResponse> {
    //     const clientRepository = AppDataSource.getRepository(Client)
    //     const oldClient = await clientRepository.findOneBy({ id: clientId })
    
    //     if (!oldClient) {
    //         throw new AppError("User not found", 404)
    //     }
    
    //     // Atualizando apenas os campos desejados
    //     clientRepository.merge(oldClient, data);
    
    //     // Salvando as alterações
    //     const updatedClient = await clientRepository.save(oldClient);
    
    //     return clientSchemaResponse.parse(updatedClient);
    // }
    


    async remove(clientId: string): Promise<void> {
        const clientRepository = AppDataSource.getRepository(Client)
        const client = await clientRepository.findOneBy({ id: clientId })

        if (!client) {
            throw new AppError("User not found", 404)
        }
        await clientRepository.remove(client)
    }
}