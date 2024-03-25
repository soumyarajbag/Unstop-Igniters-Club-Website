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
      coordinators: {
        Row: {
          email: string | null
          event_id: string | null
          id: string
        }
        Insert: {
          email?: string | null
          event_id?: string | null
          id: string
        }
        Update: {
          email?: string | null
          event_id?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_coordinators_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_coordinators_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          description: string | null
          event_name: string | null
          id: string
          image_url: string | null
          links: string[] | null
          max_team_size: number | null
          min_team_size: number | null
          participants_count: number | null
          rules: string | null
          schedule: string | null
          venue: string | null
        }
        Insert: {
          description?: string | null
          event_name?: string | null
          id?: string
          image_url?: string | null
          links?: string[] | null
          max_team_size?: number | null
          min_team_size?: number | null
          participants_count?: number | null
          rules?: string | null
          schedule?: string | null
          venue?: string | null
        }
        Update: {
          description?: string | null
          event_name?: string | null
          id?: string
          image_url?: string | null
          links?: string[] | null
          max_team_size?: number | null
          min_team_size?: number | null
          participants_count?: number | null
          rules?: string | null
          schedule?: string | null
          venue?: string | null
        }
        Relationships: []
      }
      gallery: {
        Row: {
          event_id: string | null
          id: string
          url: string | null
        }
        Insert: {
          event_id?: string | null
          id?: string
          url?: string | null
        }
        Update: {
          event_id?: string | null
          id?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_gallery_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          created_at: string
          email: string | null
          event_id: string | null
          id: string
          role: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          event_id?: string | null
          id: string
          role?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          event_id?: string | null
          id?: string
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_roles_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_roles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_roles_role_fkey"
            columns: ["role"]
            isOneToOne: false
            referencedRelation: "roles_defined"
            referencedColumns: ["role"]
          },
        ]
      }
      roles_defined: {
        Row: {
          role: string
        }
        Insert: {
          role: string
        }
        Update: {
          role?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          college: string | null
          college_roll: string | null
          email: string
          gender: string | null
          id: string
          name: string | null
          phone: string | null
        }
        Insert: {
          college?: string | null
          college_roll?: string | null
          email: string
          gender?: string | null
          id: string
          name?: string | null
          phone?: string | null
        }
        Update: {
          college?: string | null
          college_roll?: string | null
          email?: string
          gender?: string | null
          id?: string
          name?: string | null
          phone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      winners: {
        Row: {
          event_id: string | null
          id: string
          image: string | null
          links: string | null
          name: string | null
          socials: string | null
        }
        Insert: {
          event_id?: string | null
          id?: string
          image?: string | null
          links?: string | null
          name?: string | null
          socials?: string | null
        }
        Update: {
          event_id?: string | null
          id?: string
          image?: string | null
          links?: string | null
          name?: string | null
          socials?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_winners_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
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
