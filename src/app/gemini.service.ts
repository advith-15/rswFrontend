import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private readonly API_KEY = '';
  private readonly API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

  constructor(private http: HttpClient) {}

  generateSummary(comments: string, notes: string): Observable<any> {
    const prompt = `Generate a concise technical summary for a hardware part using the following details:\n\nComments: ${comments}\nNotes: ${notes}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      contents: [
        {
          parts: [
            { text: prompt }
          ]
        }
      ]
    };

    return this.http.post(`${this.API_URL}?key=${this.API_KEY}`, body, { headers });
  }
}
