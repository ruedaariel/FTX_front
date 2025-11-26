<select
                  name="plan"
                  value={formData.plan}
                  onChange={handleChange}>
                  <option value="">— Seleccionar plan —</option>

                  {/* Genera una opción por cada plan disponible */}
                  {planesDisponibles.map((plan) => (
                    <option key={plan.nombrePlan} value={plan.nombrePlan}>
                      {`${plan.nombrePlan} ($ ${plan.precio})`}
                    </option>
                  ))}
                </select>