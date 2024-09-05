import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CohereClient } from 'cohere-ai';

@Injectable()
export class CohereService {
    private readonly apiKey = "5PD2EFcc1ILIkOXH640CZt0YcuH0mifF7am81Xo3";
    // private readonly endpoint = 'https://api.cohere.ai/v1/generate';
    private cohereClient: CohereClient;

    constructor(private readonly httpService: HttpService) {
        this.cohereClient = new CohereClient({
            token: this.apiKey,
        });
    }
    async analyzeData(data: any[]): Promise<any> {
        const text = JSON.stringify(data);
        const maxTokens = 1000;
        const chunks = this.chunkText(text, maxTokens);

        try {
            const results = [];
            for (const chunk of chunks) {
                const response = await this.cohereClient.generate({
                    prompt: `Analyze this data chunk: ${chunk}`,
                    model: 'command-xlarge',
                    numGenerations: 1,
                    maxTokens: 1000,
                    temperature: 0.7,
                    k: 0,
                    p: 0.9,
                    frequencyPenalty: 0,
                    presencePenalty: 0
                });

                results.push(JSON.stringify(response.generations[0].text));
            }

            return results.join('\n');
        } catch (error) {
            console.error('Cohere API error:', error);
            throw error;
        }
    }

    private chunkText(text: string, maxLength: number): string[] {
        const chunks = [];
        for (let i = 0; i < text.length; i += maxLength) {
            chunks.push(text.slice(i, i + maxLength));
        }
        return chunks;
    }


    async chatWithData(question: string, data: any[]): Promise<any> {
        const text = JSON.stringify(data);
        const maxTokens = 1000;
        const chunks = this.chunkText(text, maxTokens);
        const responses = [];

        try {
            for (const chunk of chunks) {
                const response = await this.cohereClient.generate({
                    prompt: `Given the following data: ${chunk}, answer this question: ${question}`,
                    model: 'command-xlarge', 
                    numGenerations: 1,
                    maxTokens: 1000,
                    temperature: 0.7,
                    k: 0,
                    p: 0.9,
                    frequencyPenalty: 0,
                    presencePenalty: 0
                });

                responses.push(response.generations[0].text);
            }

            return responses.join('\n');
        } catch (error) {
            console.error('Cohere API error:', error);
            throw error;
        }
    }
}
