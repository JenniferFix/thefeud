export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      answers: {
        Row: {
          answer: string;
          created_at: string;
          id: string;
          question_id: string;
          score: number;
          user_id: string | null;
        };
        Insert: {
          answer?: string;
          created_at?: string;
          id?: string;
          question_id: string;
          score?: number;
          user_id?: string | null;
        };
        Update: {
          answer?: string;
          created_at?: string;
          id?: string;
          question_id?: string;
          score?: number;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'answers_question_id_fkey';
            columns: ['question_id'];
            isOneToOne: false;
            referencedRelation: 'questions';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'answers_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      game_instance: {
        Row: {
          created_at: string;
          id: string;
          question: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          question?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          question?: string | null;
        };
        Relationships: [];
      };
      game_round: {
        Row: {
          created_at: string;
          game_instance_id: string | null;
          id: string;
          question_id: string | null;
        };
        Insert: {
          created_at?: string;
          game_instance_id?: string | null;
          id?: string;
          question_id?: string | null;
        };
        Update: {
          created_at?: string;
          game_instance_id?: string | null;
          id?: string;
          question_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'game_round_game_instance_id_fkey';
            columns: ['game_instance_id'];
            isOneToOne: false;
            referencedRelation: 'game_instance';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'game_round_question_id_fkey';
            columns: ['question_id'];
            isOneToOne: false;
            referencedRelation: 'questions';
            referencedColumns: ['id'];
          },
        ];
      };
      questions: {
        Row: {
          created_at: string;
          id: string;
          question: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          question?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          question?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'questions_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      round_events: {
        Row: {
          answer: string | null;
          correct: boolean;
          created_at: string;
          id: number;
          round: string;
          team: number;
        };
        Insert: {
          answer?: string | null;
          correct?: boolean;
          created_at?: string;
          id?: number;
          round: string;
          team: number;
        };
        Update: {
          answer?: string | null;
          correct?: boolean;
          created_at?: string;
          id?: number;
          round?: string;
          team?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'round events_answer_fkey';
            columns: ['answer'];
            isOneToOne: false;
            referencedRelation: 'answers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'round events_round_fkey';
            columns: ['round'];
            isOneToOne: false;
            referencedRelation: 'game_round';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;
