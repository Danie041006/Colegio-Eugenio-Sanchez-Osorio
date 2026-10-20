from app.db.base_class import Base
from app.modules.academic import models as academic_models  # noqa: F401
from app.modules.identity import models as identity_models  # noqa: F401

__all__ = ["Base"]
