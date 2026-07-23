import os
import sys


# ==============================
# Configuration des chemins
# ==============================

BASE_DIR = "src"

PATHS = {
    "controller": f"{BASE_DIR}/controllers",
    "service": f"{BASE_DIR}/services",
    "repository": f"{BASE_DIR}/repositories",
    "validator": f"{BASE_DIR}/validators",
    "mapper": f"{BASE_DIR}/mappers",
    "config": f"{BASE_DIR}/config/entities",
}


# ==============================
# Templates
# ==============================


def controller_template(class_name):
    return f"""import {{ BaseController }} from "./BaseController";


export class {class_name}Controller extends BaseController {{

    constructor(service) {{
        super(service);
    }}

}}
"""


def service_template(class_name):
    return f"""import {{ BaseService }} from "./BaseService";


export class {class_name}Service extends BaseService {{

    constructor(repository, validator, mapper) {{
        super(repository, validator, mapper);
    }}

}}
"""


def repository_template(class_name):
    return f"""import {{ BaseRepository }} from "./BaseRepository";


export class {class_name}Repository extends BaseRepository {{

    constructor(table) {{
        super(table);
    }}

}}
"""


def validator_template(class_name):
    return f"""import {{ BaseValidator }} from "./BaseValidator";


export class {class_name}Validator extends BaseValidator {{

    constructor(columns) {{
        super(columns);
    }}

}}
"""


def mapper_template(class_name):
    return f"""import {{ BaseMapper }} from "./BaseMapper";


export class {class_name}Mapper extends BaseMapper {{

    constructor(columns) {{
        super(columns);
    }}

}}
"""


def config_template(entity, class_name, title):

    return f"""import {{ createEntityConfig }} from "../createEntityConfig";


import {{ {class_name}Repository }} from "../../repositories/{class_name}Repository";
import {{ {class_name}Service }} from "../../services/{class_name}Service";
import {{ {class_name}Validator }} from "../../validators/{class_name}Validator";
import {{ {class_name}Mapper }} from "../../mappers/{class_name}Mapper";


const columns = [

    // TODO ajouter les champs

];


export const {entity}Config = createEntityConfig({{

    entity: "{entity}",

    title: "{title}",

    table: "{entity}",


    Repository: {class_name}Repository,
    Service: {class_name}Service,
    Validator: {class_name}Validator,
    Mapper: {class_name}Mapper,


    columns

}});
"""


# ==============================
# Utilitaires
# ==============================


def create_file(path, content):

    if os.path.exists(path):
        print("Existe déjà :", path)
        return

    os.makedirs(os.path.dirname(path), exist_ok=True)

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

    print("Créé :", path)



def to_class_name(name):

    parts = name.replace("-", "_").split("_")

    return "".join(
        p.capitalize()
        for p in parts
    )


# ==============================
# Main
# ==============================


if len(sys.argv) < 4:

    print(
        "Usage : python generate_entity.py entity title table"
    )

    print(
        'Exemple : python generate_entity.py chanteurs "les Chanteurs" chanteurs'
    )

    sys.exit(1)



entity = sys.argv[1]
title = sys.argv[2]
table = sys.argv[3]


class_name = to_class_name(entity)


print()
print("Génération :", class_name)
print()



create_file(
    f"{PATHS['controller']}/{class_name}Controller.js",
    controller_template(class_name)
)


create_file(
    f"{PATHS['service']}/{class_name}Service.js",
    service_template(class_name)
)


create_file(
    f"{PATHS['repository']}/{class_name}Repository.js",
    repository_template(class_name)
)


create_file(
    f"{PATHS['validator']}/{class_name}Validator.js",
    validator_template(class_name)
)


create_file(
    f"{PATHS['mapper']}/{class_name}Mapper.js",
    mapper_template(class_name)
)


create_file(
    f"{PATHS['config']}/{entity}.config.js",
    config_template(
        entity,
        class_name,
        title
    )
)


print()
print("Terminé")