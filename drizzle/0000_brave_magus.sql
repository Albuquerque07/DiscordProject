CREATE TABLE "bot" (
	"idbot" serial PRIMARY KEY NOT NULL,
	"nomebot" varchar(80) NOT NULL,
	"funcaobot" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "canal" (
	"idcanal" serial PRIMARY KEY NOT NULL,
	"nomecanal" varchar(80) NOT NULL,
	"tipocanal" varchar(20) NOT NULL,
	"canalepriv" boolean DEFAULT false NOT NULL,
	"idcategoria" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cargo" (
	"idcargo" serial PRIMARY KEY NOT NULL,
	"nomecargo" varchar(50) NOT NULL,
	"corcargo" varchar(7) DEFAULT '#99AAB5' NOT NULL,
	"idserver" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "categoria" (
	"idcategoria" serial PRIMARY KEY NOT NULL,
	"nomecategoria" varchar(80) NOT NULL,
	"cateprivada" boolean DEFAULT false NOT NULL,
	"idserver" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contatodireto" (
	"iduser_destinatario" integer NOT NULL,
	"iduser_remetente" integer NOT NULL,
	"conteudocontato" text NOT NULL,
	"apelidocontato" varchar(50),
	CONSTRAINT "contatodireto_iduser_destinatario_iduser_remetente_pk" PRIMARY KEY("iduser_destinatario","iduser_remetente")
);
--> statement-breakpoint
CREATE TABLE "mensagem" (
	"idmsg" serial PRIMARY KEY NOT NULL,
	"conteudomsg" text NOT NULL,
	"horariomsg" timestamp DEFAULT now() NOT NULL,
	"idcanal" integer NOT NULL,
	"iduser" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "participa" (
	"idserver" integer NOT NULL,
	"iduser" integer NOT NULL,
	CONSTRAINT "participa_idserver_iduser_pk" PRIMARY KEY("idserver","iduser")
);
--> statement-breakpoint
CREATE TABLE "permissao" (
	"idpermissao" serial PRIMARY KEY NOT NULL,
	"nomepermissao" varchar(60) NOT NULL,
	"tipopermissao" varchar(30) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "possuibot" (
	"idbot" integer NOT NULL,
	"idserver" integer NOT NULL,
	CONSTRAINT "possuibot_idbot_idserver_pk" PRIMARY KEY("idbot","idserver")
);
--> statement-breakpoint
CREATE TABLE "possuiperm" (
	"idcargo" integer NOT NULL,
	"idpermissao" integer NOT NULL,
	CONSTRAINT "possuiperm_idcargo_idpermissao_pk" PRIMARY KEY("idcargo","idpermissao")
);
--> statement-breakpoint
CREATE TABLE "qualifica" (
	"idcargo" integer NOT NULL,
	"iduser" integer NOT NULL,
	CONSTRAINT "qualifica_idcargo_iduser_pk" PRIMARY KEY("idcargo","iduser")
);
--> statement-breakpoint
CREATE TABLE "servidor" (
	"idserver" serial PRIMARY KEY NOT NULL,
	"nomeserver" varchar(100) NOT NULL,
	"datainicioserver" date DEFAULT now() NOT NULL,
	"nivelimpulso" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "usuario" (
	"iduser" serial PRIMARY KEY NOT NULL,
	"apelidouser" varchar(50) NOT NULL,
	"emailuser" varchar(100) NOT NULL,
	"senhauser" varchar(255) NOT NULL,
	"datainiciouser" date DEFAULT now() NOT NULL,
	"statususer" varchar(20) DEFAULT 'online' NOT NULL,
	"temnitro" boolean DEFAULT false NOT NULL,
	CONSTRAINT "usuario_emailuser_unique" UNIQUE("emailuser")
);
--> statement-breakpoint
CREATE TABLE "viraamigode" (
	"iduser_solicitante" integer NOT NULL,
	"iduser_receptor" integer NOT NULL,
	"datainicio" date DEFAULT now() NOT NULL,
	"status" varchar(20) DEFAULT 'pendente' NOT NULL,
	CONSTRAINT "viraamigode_iduser_solicitante_iduser_receptor_pk" PRIMARY KEY("iduser_solicitante","iduser_receptor")
);
--> statement-breakpoint
ALTER TABLE "canal" ADD CONSTRAINT "canal_idcategoria_categoria_idcategoria_fk" FOREIGN KEY ("idcategoria") REFERENCES "public"."categoria"("idcategoria") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cargo" ADD CONSTRAINT "cargo_idserver_servidor_idserver_fk" FOREIGN KEY ("idserver") REFERENCES "public"."servidor"("idserver") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "categoria" ADD CONSTRAINT "categoria_idserver_servidor_idserver_fk" FOREIGN KEY ("idserver") REFERENCES "public"."servidor"("idserver") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contatodireto" ADD CONSTRAINT "contatodireto_iduser_destinatario_usuario_iduser_fk" FOREIGN KEY ("iduser_destinatario") REFERENCES "public"."usuario"("iduser") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contatodireto" ADD CONSTRAINT "contatodireto_iduser_remetente_usuario_iduser_fk" FOREIGN KEY ("iduser_remetente") REFERENCES "public"."usuario"("iduser") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mensagem" ADD CONSTRAINT "mensagem_idcanal_canal_idcanal_fk" FOREIGN KEY ("idcanal") REFERENCES "public"."canal"("idcanal") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mensagem" ADD CONSTRAINT "mensagem_iduser_usuario_iduser_fk" FOREIGN KEY ("iduser") REFERENCES "public"."usuario"("iduser") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "participa" ADD CONSTRAINT "participa_idserver_servidor_idserver_fk" FOREIGN KEY ("idserver") REFERENCES "public"."servidor"("idserver") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "participa" ADD CONSTRAINT "participa_iduser_usuario_iduser_fk" FOREIGN KEY ("iduser") REFERENCES "public"."usuario"("iduser") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "possuibot" ADD CONSTRAINT "possuibot_idbot_bot_idbot_fk" FOREIGN KEY ("idbot") REFERENCES "public"."bot"("idbot") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "possuibot" ADD CONSTRAINT "possuibot_idserver_servidor_idserver_fk" FOREIGN KEY ("idserver") REFERENCES "public"."servidor"("idserver") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "possuiperm" ADD CONSTRAINT "possuiperm_idcargo_cargo_idcargo_fk" FOREIGN KEY ("idcargo") REFERENCES "public"."cargo"("idcargo") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "possuiperm" ADD CONSTRAINT "possuiperm_idpermissao_permissao_idpermissao_fk" FOREIGN KEY ("idpermissao") REFERENCES "public"."permissao"("idpermissao") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "qualifica" ADD CONSTRAINT "qualifica_idcargo_cargo_idcargo_fk" FOREIGN KEY ("idcargo") REFERENCES "public"."cargo"("idcargo") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "qualifica" ADD CONSTRAINT "qualifica_iduser_usuario_iduser_fk" FOREIGN KEY ("iduser") REFERENCES "public"."usuario"("iduser") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "viraamigode" ADD CONSTRAINT "viraamigode_iduser_solicitante_usuario_iduser_fk" FOREIGN KEY ("iduser_solicitante") REFERENCES "public"."usuario"("iduser") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "viraamigode" ADD CONSTRAINT "viraamigode_iduser_receptor_usuario_iduser_fk" FOREIGN KEY ("iduser_receptor") REFERENCES "public"."usuario"("iduser") ON DELETE cascade ON UPDATE no action;