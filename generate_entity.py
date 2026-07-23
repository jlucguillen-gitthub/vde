import os
import sys


BASE_DIR = "src"


PATHS = {
    "controller": f"{BASE_DIR}/controllers",
    "service": f"{BASE_DIR}/services",
    "repository": f"{BASE_DIR}/repositories",
    "validator": f"{BASE_DIR}/validators",
    "mapper": f"{BASE_DIR}/mappers",
    "config": f"{BASE_DIR}/config/entities",
    "page": f"{BASE_DIR}/pages/admin/referentiels",
}


# -----------------------
# Helpers
# -----------------------

def class_name(entity):
    return entity[0].upper() + entity[1:]


def table_name(entity):
    return entity + "s"


def title_name(entity):

    titles = {
        "chanteur": "🎤 Chanteurs",
        "pupitre": "🎼 Pupitres",
        "saison": "📅 Saisons",
        "chanson": "🎵 Chansons",
    }

    return titles.get(
        entity,
        entity.capitalize()
    )


def create_file(path, content):

    if os.path.exists(path):
        print("Existe déjà :", path)
        return

    os.makedirs(
        os.path.dirname(path),
        exist_ok=True
    )

    with open(
        path,
        "w",
        encoding="utf-8"
    ) as f:
        f.write(content)

    print("Créé :", path)



# -----------------------
# Templates
# -----------------------

def repository_template(cls):

    return f"""import {{ BaseRepository }} from "./BaseRepository";


export class {cls}Repository extends BaseRepository {{

    constructor(table) {{
        super(table);
    }}

}}
"""


def service_template(cls):

    return f"""import {{ BaseService }} from "./BaseService";


export class {cls}Service extends BaseService {{

    constructor(repository, validator, mapper) {{
        super(repository, validator, mapper);
    }}

}}
"""


def validator_template(cls):

    return f"""import {{ BaseValidator }} from "./BaseValidator";


export class {cls}Validator extends BaseValidator {{

    constructor(columns) {{
        super(columns);
    }}

}}
"""


def mapper_template(cls):

    return f"""import {{ BaseMapper }} from "./BaseMapper";


export class {cls}Mapper extends BaseMapper {{

    constructor(columns) {{
        super(columns);
    }}

}}
"""


def controller_template(cls, custom):

    extra = ""

    if custom:
        extra = """
    
    // méthodes spécifiques ici

"""

    return f"""import {{ BaseController }} from "./BaseController";


export class {cls}Controller extends BaseController {{

    constructor(service) {{
        super(service);
    }}
{extra}
}}
"""


def config_template(entity, cls, table, title):

    return f"""import {{ createEntityConfig }} from "../createEntityConfig";

import {{ {cls}Repository }} from "../../repositories/{cls}Repository";
import {{ {cls}Service }} from "../../services/{cls}Service";
import {{ {cls}Validator }} from "../../validators/{cls}Validator";
import {{ {cls}Mapper }} from "../../mappers/{cls}Mapper";


const columns = [

    // TODO ajouter les champs

];


export const {entity}Config = createEntityConfig({{

    entity: "{entity}",

    title: "{title}",

    table: "{table}",


    Repository: {cls}Repository,
    Service: {cls}Service,
    Validator: {cls}Validator,
    Mapper: {cls}Mapper,


    columns

}});
"""


def page_template(entity, cls):

    return f"""import {{ useEffect, useState }} from "react";
import {{ supabase }} from "../../../../core/supabase/client";
import CRUDPage from "../../../../framework/crud/CRUDPage";
import {{ {entity}Config }} from "../../../../config/entities/{entity}.config";


export default function {cls}Page() {{

  const [session, setSession] = useState(null);


  useEffect(() => {{

    const fetchSession = async () => {{

      const {{ data: {{ session }} }} =
        await supabase.auth.getSession();

      console.log(session);

      setSession(session);

    }};


    fetchSession();

  }}, []);



  return (
    <CRUDPage
        config={{{entity}Config}}
    />
  );

}}
"""



# -----------------------
# Main
# -----------------------

if len(sys.argv) < 2:

    print(
        "Usage : python generate_entity.py entity [--custom-controller]"
    )

    sys.exit(1)



entity = sys.argv[1]

custom_controller = "--custom-controller" in sys.argv


cls = class_name(entity)

table = table_name(entity)

title = title_name(entity)



print()
print("entity :", entity)
print("class  :", cls)
print("table  :", table)
print("title  :", title)
print()



create_file(
    f"{PATHS['repository']}/{cls}Repository.js",
    repository_template(cls)
)


create_file(
    f"{PATHS['service']}/{cls}Service.js",
    service_template(cls)
)


create_file(
    f"{PATHS['validator']}/{cls}Validator.js",
    validator_template(cls)
)


create_file(
    f"{PATHS['mapper']}/{cls}Mapper.js",
    mapper_template(cls)
)


create_file(
    f"{PATHS['controller']}/{cls}Controller.js",
    controller_template(
        cls,
        custom_controller
    )
)


create_file(
    f"{PATHS['config']}/{entity}.config.js",
    config_template(
        entity,
        cls,
        table,
        title
    )
)


create_file(
    f"{PATHS['page']}/{entity}/{cls}Page.jsx",
    page_template(
        entity,
        cls
    )
)


print()
print("Génération terminée")