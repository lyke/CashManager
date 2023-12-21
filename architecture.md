# Architecture

## Sommaire
<!-- TOC -->
* [Architecture](#architecture)
  * [Sommaire](#sommaire)
  * [Architecture en couche](#architecture-en-couche)
  * [DAO Pattern](#dao-pattern)
    * [Les deux versions du DAO pattern appliqué au projet cash manager](#les-deux-versions-du-dao-pattern-appliqué-au-projet-cash-manager)
  * [databaseService](#databaseservice)
<!-- TOC -->

## Architecture en couche

Comme le montre le diagramme de classe suivant, nous avons choisi une architecture en couche.
Cette architecture est un standard de la programmation, ce qui permet d'être facilement compréhensible par les devs.
De plus le principe de la programmation en couche est de minimiser les dépendances entre chaque partie, ici par exemple on peut aisément changer de base de donnée en changeant seulement l'implémentation de `databaseServiceInterface`.

Notre architecture en couche est personnalisée.
Nous n'avons pas voulu suivre le modèle MVC, peu adapté à node JS et à la construction d'une API.
Nous nous rapprochons plus de l'architecture du framework Java Spring, en particulier avec l'intégration des DAO (data access object).
Nous n'avons pas besoins de DTO (data transfert object) puisque les objets JS sont déjà dans le format de données majoritairement utilisé dans le web (Json).

![classDiagram.png](uml/classDiagram.png)

## DAO Pattern

Le DAO (dont nous avons déjà parlé plus haut) est un design pattern permettant d'isoler la couche base de données du reste de l'application.


Deux versions de ce design pattern existes, une appelée data-mapper et une appelée data-gateway.
Nous avons choisi la version data-gateway, qui permet une meileurs séparation des couches.
Pour illustrer la différence voilà un exemple des deux architectures appliqué à notre projet.

### Les deux versions du DAO pattern appliqué au projet cash manager

![DAO-pattern-diagram.png](uml/DAO-pattern-diagram.png)

Comme on le voit le data-mapper préserve moins bien l'indépendance de la couche base de donnée.

## databaseService

Toujours dans l'optique de découpler un maixmum les dépendance à mysql, nous avons mis en place une couche d'abstraction de haut niveau sur le service d'accès à la base de donnée.

Bien qu'assez simple, le système est très efficace puisque dès lors, tout les DAO dépendent d'une interface.
En cas de changement de base de donnée, il suffit de créer une nouvelle implémentation de cette interface permettant de d'éxecuter une requête.
En changeant simplement la manière dont notre factory instancie l'implémentation de l'interface `databaseServiceInterface`.

Pour mieux comprendre un diagrame de classe simplifié qui se concentre sur l'implémentation du databaseService :

![databaseService.png](uml/databaseService.png)