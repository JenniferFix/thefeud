
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      answers: {
        Row: {
          answer: string
          created_at: string
          id: string
          question_id: string
          score: number
          user_id: string
        }
        Insert: {
          answer?: string
          created_at?: string
          id?: string
          question_id: string
          score?: number
          user_id?: string
        }
        Update: {
          answer?: string
          created_at?: string
          id?: string
          question_id?: string
          score?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      game_events: {
        Row: {
          answerid: string | null
          created_at: string
          eventid: number
          id: number
          instanceid: string
          points: number | null
          questionid: string | null
          team: number | null
        }
        Insert: {
          answerid?: string | null
          created_at?: string
          eventid: number
          id?: number
          instanceid: string
          points?: number | null
          questionid?: string | null
          team?: number | null
        }
        Update: {
          answerid?: string | null
          created_at?: string
          eventid?: number
          id?: number
          instanceid?: string
          points?: number | null
          questionid?: string | null
          team?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "game_events_answerid_fkey"
            columns: ["answerid"]
            isOneToOne: false
            referencedRelation: "answers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_events_instanceid_fkey"
            columns: ["instanceid"]
            isOneToOne: false
            referencedRelation: "game_instance"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_events_questionid_fkey"
            columns: ["questionid"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      game_instance: {
        Row: {
          created_at: string
          game: string
          id: string
          userid: string
        }
        Insert: {
          created_at?: string
          game: string
          id?: string
          userid?: string
        }
        Update: {
          created_at?: string
          game?: string
          id?: string
          userid?: string
        }
        Relationships: [
          {
            foreignKeyName: "game_instance_game_fkey"
            columns: ["game"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_instance_userid_fkey"
            columns: ["userid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      game_questions: {
        Row: {
          gameid: string
          questionid: string
          userid: string
        }
        Insert: {
          gameid: string
          questionid: string
          userid?: string
        }
        Update: {
          gameid?: string
          questionid?: string
          userid?: string
        }
        Relationships: [
          {
            foreignKeyName: "game_questions_gameid_fkey"
            columns: ["gameid"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_questions_questionid_fkey"
            columns: ["questionid"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_questions_userid_fkey"
            columns: ["userid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      games: {
        Row: {
          created_at: string
          id: string
          name: string | null
          userid: string
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
          userid?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
          userid?: string
        }
        Relationships: [
          {
            foreignKeyName: "games_userid_fkey"
            columns: ["userid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      questions: {
        Row: {
          created_at: string
          id: string
          question: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          question?: string | null
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: string
          question?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "questions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
